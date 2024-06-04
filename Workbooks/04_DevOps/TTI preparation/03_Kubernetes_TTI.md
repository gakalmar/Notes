# KUBERNETES
- **Docs:**
    - Full documentation: https://kubernetes.io/docs/home/
    - Full Kubernetes commands guide: https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands

- **Getting started in general:**
    - Create a VPC, then create a cluster first:
        - create a VPC (not necessary!)
        - create yaml file for cluster (see resources - with or without existing VPC)
        - `eksctl create cluster -f cluster.yaml`
    - after you're done, make sure to update your context like this:
        - `aws eks update-kubeconfig --region eu-west-2 --name gk-cluster`
    - or swap to minikube context:
        - `kubectl config use-context minikube`

- **Resources:**
    - After we created a cluster and we set the context to that cluster, we can start adding items using `yaml` manifest files:
        - For both the frontend and backend we create:
            - A Deployment, that is responsible for managing the Pods:
                - `kubectl apply -f deployment.yaml` (add containerPort)
            - And a corresponding Service, that we attach to Pods, to access them:
                - `kubectl apply -f service.yaml` (add port and targetPort)
        - We can now check what is in our cluster:
            - `kubectl get pods` add `-o wide` to get more details, eg IP addresses
            - `kubectl get deployments`
            - `kubectl get events`
            - `kubectl describe deployment <deployment_name>`
        - Step into a pod:
            - `kubectl exec -it <pod-name> -n <namespace> -- /bin/sh`
        - Modify deployment:
            - `kubectl scale --replicas=6 deployment <deployment_name>`
        - Delete deployment:
            - `kubectl delete deployment <deployment_name> --cascade` (cascasde deletes the pods as well)

- **Namespaces:**
    - Create a new namespace:
        - `kubectl create -f namespace.yaml`
    - Useful commands:
        - `kubectl get namespaces`
        - `kubectl get namespaces <name>` (overview)
        - `kubectl describe namespaces <name>` (detailed overview)
        - `kubectl delete namespaces <namespace-name>` (it also deletes everything under it!)

- **Using Role-based access control (RBAC):**
    - Create a Service Account:
        - `kubectl apply -f service-account.yaml` (use `serviceAccount.yml` file)
    - Create a Role:
        - `kubectl apply -f role-pod.yaml`
    - Create Role-binding:
        - `kubectl apply -f role-binding.yaml`

- **Using PersistenVolume and PersistentVolumeClaim:**
    - **Task:** You need to create a 5 GB `EBS volume` and an `AWS EBS StorageClass` in your cluster. The `EBS volume` will serve as persistent storage for your `PostgreSQL` database:
        - Create an `EBS Volume`:
            - In AWS management console, go to EC2, then to the `Volumes` tab. 
            - Create volume with these settings:
                - `General Purpose SSD gp3`
                - Size: `5 GiB`
                - make sure to use the same availability zone az the cluster
                - name it after creation if it can't be named during the creation
        - Create a `StorageClass`:
            - `kubectl apply -f storage-class.yaml`
        - Create a `PersistentVolume`:
            - `kubectl apply -f persistent-volume.yaml` (update volumeID with `EBS volumeID`)
        - Create a `PersistentVolumeClaim`:
            - `kubectl apply -f persistent-volume-claim.yaml`
    - Verify creation:
        - `kubectl get pv`
        - `kubectl get pvc`

- **Deploy an App to a cluster:** (Tinker, Tailor, Docker, Spy)
    1. Create a flask app with python
    2. Create Dockerfile
    3. Build app:
        - `docker build -t gakalmar/hello-world:1.0 .`
        - use `docker images` to check your images
        - run the image with `docker run -p 5000:5000 gakalmar/hello-world:1.0`
    4. Upload it to a repo, once built and working: (We are using AWS ECR, not DockerHub!)
        - In AWS ECR:
            - Create repo:
                - name it (a repo is for each app, so the name should reflect the app!)
            - Click on the repo, then go throught the push commands guide
    5. Deploy the image from ECR to a Kubernetes cluster:
        - Create a cluster:
            - `eksctl create cluster -f cluster.yaml`
            - after you're done, make sure to update your context like this:
                - `aws eks update-kubeconfig --region eu-west-2 --name gk-cluster`
        - Prepare configurations:
            - `deployment-hw.yaml` (use image from ECR)
            - `service-hw.yaml` (type: LoadBalancer)
        - Deploy to the k8s Cluster you just created:
            - `kubectl apply -f deployment-hw.yaml`
            - `kubectl apply -f service-hw.yaml`
        - Check success:
            - `kubectl get pods` (should be in Running state!)
            - `kubectl get services` (you can test the connection using the external-ip)

- **Typical Backend-Frontend combinations:**
    - `Node.js` Backend with `Nginx` Frontend:
        - **Backend:** `node:alpine`
        - **Frontend:** `nginx:alpine`
    - `Python` (`Django/Flask`) Backend with `Nginx` Frontend:
        - **Backend:** `python:alpine`
        - **Frontend:** `nginx:alpine`

# SIMPLE SETUPS:

1. Create a sample deployment and expose it on port 8080 
    - use files in `simple-setups/01` folder:
        - `kubectl apply -f deployment.yaml`
        - `kubectl apply -f service.yaml` (NodePort)
    - to be able to connect, we need to find out the node's IP address, then the port in the NodePort (that's why it's easy to )

2. Deploy an application using a LoadBalancer:
    - use files in `simple-setups/02` folder:
        - `kubectl apply -f deployment.yaml`
        - `kubectl apply -f service.yaml` (LoadBalancer)
    - coneect:
        - `kubectl get svc my-app-service`, 
        - then use the `<EXTERNAL-IP>:<PORT>` to connect though the browser or with curl
    - Add an ingress (optional, in case we would need routing - we also need an ingress controller):
        - `kubectl apply -f ingress.yaml`

# YAML FILES

- General build-up:
        
        apiVersion: # eg. v1
        kind: # eg. Service / Deployment
        metadata:
            name: # what we want to call it
            labels: # eg `app: nginx`
        spec:
            # here goes all the configuration of that element (kind specific)

        (status) -> this is done hidden -> existing state needs to match desired state (info comes from the etcd)

- Deployment:
    - Deployment -> manages a ReplicaSet -> manages a Pod -> manages a Container
    - `spec` for a `Deployment has 3 sections:
        - `replicas`:
        - `selector`: `matchLabels` section has values like `app: nginx`
        - `template`: this is the configuration for the Pods (also has its own `metadata` and `spec` files) - the same as the yaml file for a single `pod` would be

- Connection is done using `Labels` and `Selectors`:
    - `Labels`:
        - defined in `metadata` tabs
        - we put a label eg. on a `pod`, but also on a `Deployment` (the latter is used to connect a `Service`)
            - `Service` won't have a label, just a `matchLabels` tag
    - `Selectors` 
        - defined in `spec/selector/matchLabels` for a `Deployment`
        - We basically say, that all items containg the label `app: nginx` should be connected to this `Deployment`

- Ports:
    - Need to be defined in the `Service` resource:
        - eg:
                ports:
                  - protocol: TCP
                    port:80 # this is the Service's port
                    targetPort: 8080 # refers to the Pod's open port, need to match targetPort in the Pod config
    
    - The `targetPort` defined in the `Service` needs to match the `containerPort` defined in the `Deployment`'s `template/spec/container` section, which gives the `Pod`'s layout
