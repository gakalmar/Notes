# KUBERNETES / K8s

## TERMINOLOGY:
- `Node`: 
    - A worker machine in Kubernetes, part of a cluster.
- `Cluster`: 
    - A set of Nodes that run containerized applications managed by Kubernetes. In most common Kubernetes deployments, nodes in the cluster are not part of the public internet.
- `Master Node`: 
    - In each Kubernetes cluster, there is a master node which is responsible for executing the api calls to the cluster, therefore it handles all communication regarding configuration between the user (engineers) and the cluster.
- `Worker Node`: 
    - These are responsible for handling the workloads that are placed onto the cluster by the master node, so the worker nodes are responsible for running the application itself that is configured to run on the cluster.

## KUBERNETES BASICS:
- **What is Kubernetes?**
    - an open-source system for automating deployment, scaling, and management of containerized applications
    - groups containers that make up an application into logical units for easy management and discovery

- **Key concepts:**
    - **Automated rollouts and rollbacks:** 
        - Kubernetes progressively rolls out changes to your application or its configuration, while monitoring application health to ensure it doesn't kill all your instances at the same time. If something goes wrong, Kubernetes will rollback the change for you. Take advantage of a growing ecosystem of deployment solutions.
    - **Service Topology:** Routing of service traffic based upon cluster topology.
    - **Secret and configuration management:** 
        - Deploy and update secrets and application configuration without rebuilding your image and without exposing secrets in your stack configuration.
    - **Batch execution:** 
        - In addition to services, Kubernetes can manage your batch and CI workloads, replacing containers that fail, if desired.
    - **Horizontal scaling:** 
        - Scale your application up and down with a simple command, with a UI, or automatically based on health/load indicators.
    - **Service discovery and load balancing:** 
        - No need to modify your application to use an unfamiliar service discovery mechanism. Kubernetes gives Pods their own IP addresses and a single DNS name for a set of Pods, and can load-balance across them.
    - **Storage orchestration:** 
        - Automatically mount the storage system of your choice, whether from local storage, a public cloud provider such as GCP or AWS, or a network storage system such as NFS, iSCSI, Gluster, Ceph, Cinder, or Flocker.
    - **Automatic bin packing:** 
        - Automatically places containers based on their resource requirements and other constraints, while not sacrificing availability. Mix critical and best-effort workloads in order to drive up utilization and save even more resources.
    - **IPv4/IPv6 dual-stack:** 
        - Allocation of IPv4 and IPv6 addresses to Pods and Services
    - **Self-healing:** 
        - Restarts containers that fail, replaces and reschedules containers when nodes die, kills containers that don't respond to your user-defined health check, and doesn't advertise them to clients until they are ready to serve.

- **Minikube:**
    - a tool that lets you run a Kubernetes cluster on your own computer with minimal setup
    - The benefit is that it doesn't need a cloud provider to host your cluster, but it makes your computer slower, depending on the workload and size of the cluster

- **Kubernetes Objects:**
    - K8s consists of objects, that can be created from the CLI or from `yaml` *template files*
        - **CLI**: not recommended as can't keep track of versions
        - **template files**: allow version control
    - **K8s Objects:**
        - **Pod:**
            - **Definition:**
                - `Pods` are the smallest deployable units of computing that you can create and manage in Kubernetes
                - A `Pod` is a group of one or more containers, with shared storage and network resources, and a specification for how to run the containers. 
                - Its contents are always co-located and co-scheduled, and run in a shared context.
                - It is similar to a *group of Docker containers* with shared namespaces and shared filesystem volumes.
            - **You don't need to create them manually:**
                - create them using workload resources such as `Deployment` or `Job`
                - If your Pods need to track state, consider the `StatefulSet` resource
            - **Used in 2 main ways:**
                - Pods that run a **single container**:
                    - The "one-container-per-Pod" model is the most common Kubernetes use case; in this case, you can think of a `Pod` as a wrapper around a single container
                    - Kubernetes manages `Pods` rather than managing the containers directly

                - Pods that run **multiple containers** that need to work together:
                    - A `Pod` can encapsulate an application composed of multiple co-located containers that are tightly coupled and need to share resources
                    - These co-located containers form a single cohesive unit of service—for example, one container serving data stored in a shared volume to the public, while a separate sidecar container refreshes or updates those files.
                    - The `Pod` wraps these containers, storage resources, and an ephemeral network identity together as a single unit.
                
                - Note: Each `Pod` is meant to run a single instance of a given application. If you want to scale your application horizontally (to provide more overall resources by running more instances), you should use multiple `Pods`, one for each instance. In Kubernetes, this is typically referred to as **replication**. Replicated `Pods` are usually created and managed as a group by a workload resource and its controller.
            
            - `Pod` template:

                    apiVersion: v1
                    kind: Pod
                    metadata:
                    name: mongo
                    labels:
                    app: mongo
                    spec:
                    containers:
                    - name: mongo
                    image: mongo
                    ports:
                    - containerPort: 27017

            - **Static Pod:**
                - `kubelet:`:
                    - The `kubelet` is the primary "node agent" that runs on each node. It can register the node with the `apiserver` using one of the following:
                        - the hostname
                        - a flag to override the hostname
                        - or specific logic for a cloud provider.
                - `Static Pods` are managed directly by the `kubelet daemon` on a specific node, without the `API server` observing them
                    - as opposed to `Pods` that are managed by the control plane (for example, a Deployment)
                    - the `kubelet` watches each static `Pod` (and restarts it if it fails)
                    - `Static Pods` are always *bound to one Kubelet on a specific node*
                - The `kubelet` automatically tries to create a mirror `Pod` on the `Kubernetes API server` for each `static Pod`.
                    - This means that the `Pods` running on a node are visible on the API server, but cannot be controlled from there
                    - The `Pod` names will suffixed with the node hostname with a leading hyphen
        
        - **Init Containers:**
            - A `Pod` can have multiple containers, running apps within it, but it can also have one or more `init containers`, which are *run before the app containers are started*.

            - `Init containers` are exactly like regular containers, except:
                - `Init containers` always run to completion.
                - Each `init container` must complete successfully before the next one starts.

            - If a `Pod`'s `init container` fails, the `kubelet` repeatedly restarts that `init container` until it succeeds. However, if the `Pod` has a `restartPolicy` of `Never`, and an `init container` fails during startup of that `Pod`, Kubernetes treats the overall `Pod` as failed.
        
        - **Jobs:**
            - A `Job` creates one or more `Pods` and will continue to retry execution of the `Pods` until a specified number of them successfully terminate:
                - As `pods` successfully complete, the `Job` tracks the successful completions
                - When a specified number of successful completions is reached, the task (ie, `Job`) is complete. 
                - Deleting a `Job` will clean up the Pods it created.

            - A simple case is to create one `Job object` in order to reliably run one `Pod` to completion:
                -  The `Job object` will start a new `Pod` if the first `Pod` fails or is deleted (for example due to a node hardware failure or a node reboot).
                - You can also use a `Job` to run multiple `Pods` in parallel.
        
        - **ReplicaSet:**
            - A `ReplicaSet`'s purpose is to maintain a stable set of replica `Pods` running at any given time:
                - It is often used to guarantee the availability of a specified number of identical `Pods`
            - A `ReplicaSet` is defined with `fields`, including:
                - a `selector` that specifies how to identify `Pods` it can acquire
                - a `number of replicas` indicating how many `Pods` it should be maintaining
                - a `pod template` specifying the data of new `Pods` it should create to meet the number of replicas criteria. 
            - A `ReplicaSet` then fulfills its purpose by creating and deleting `Pods` as needed to reach the desired number. When a `ReplicaSet` needs to create new `Pods`, it uses its `Pod template`.
            - A `ReplicaSet` is linked to its `Pods` via the Pods' `metadata.ownerReferences` field, which specifies what resource the current object is owned by. 
                - All `Pods` acquired by a `ReplicaSet` have their owning `ReplicaSet`'s identifying information within their `ownerReferences` field. 
                - It's through this link that the `ReplicaSet` knows of the state of the `Pods` it is maintaining and plans accordingly.
            - A `ReplicaSet` identifies new `Pods` to acquire by using its `selector`:
                - If there is a `Pod` that has no `OwnerReference` or the `OwnerReference` is not a `Controller` and it matches a `ReplicaSet`'s `selector`, it will be immediately acquired by said `ReplicaSet`.
            - A `ReplicaSet` ensures that a specified number of `pod` replicas are running at any given time. However, a `Deployment` is a higher-level concept that manages `ReplicaSets` and provides declarative updates to `Pods` along with a lot of other useful features. 
                - It's recommended to use `Deployments` instead of directly using `ReplicaSets`, unless you require custom update orchestration or don't require updates at all.
                - This actually means that you may never need to manipulate `ReplicaSet` objects: use a `Deployment` instead, and define your application in the `spec` section.
            
            - `ReplicaSet` template:

                    apiVersion: apps/v1
                    kind: ReplicaSet
                    metadata:
                    name: frontend
                    labels:
                    app: guestbook
                    tier: frontend
                    spec:
                    # modify replicas according to your case
                    replicas: 3
                    selector:
                    matchLabels:
                    tier: frontend
                    template:
                    metadata:
                    labels:
                    tier: frontend
                    spec:
                    containers:
                    - name: php-redis
                    image: gcr.io/google_samples/gb-frontend:v3
        
        - **Deployment:**
             - A `Deployment` provides declarative updates for `Pods` and `ReplicaSets`

            - After you describe a desired state in a `Deployment`, the `Deployment Controller` changes the actual state to the desired state at a controlled rate. 
                - You can define `Deployments` to create new `ReplicaSets`, or to remove existing `Deployments` and adopt all their resources with new `Deployments`.

            - The following are typical use cases for `Deployments`:
                1. Create a `Deployment` to rollout a `ReplicaSet`. The `ReplicaSet` creates `Pods` in the background. Check the status of the rollout to see if it succeeds or not.
                2. Declare the new *state* of the `Pods` by updating the `PodTemplateSpec` of the `Deployment`. A new `ReplicaSet` is created and the `Deployment` manages moving the `Pods` from the old `ReplicaSet` to the new one at a controlled rate. Each new `ReplicaSet` updates the revision of the `Deployment`.
                3. Rollback to an earlier `Deployment` revision if the current state of the `Deployment` is not stable. Each rollback updates the revision of the `Deployment`.
                4. Scale up the `Deployment` to facilitate more load.
                5. Pause the `Deployment` to apply multiple fixes to its `PodTemplateSpec` and then resume it to start a new rollout.
                6. Use the status of the `Deployment` as an indicator that a rollout has stuck.
                7. Clean up older `ReplicaSets` that you don't need anymore.
            
            - `Deployment` template:

                    apiVersion: apps/v1
                    kind: Deployment
                    metadata:
                    name: nginx-deployment
                    labels:
                    app: nginx
                    spec:
                    replicas: 3
                    selector:
                    matchLabels:
                    app: nginx
                    template:
                    metadata:
                    labels:
                    app: nginx
                    spec:
                    containers:
                    - name: nginx
                    image: nginx:1.14.2
                    ports:
                    - containerPort: 80

        - **DaemonSet:**
            - A `DaemonSet` ensures that all (or some) Nodes run a copy of a `Pod`:
                - As nodes are added to the cluster, `Pods` are added to them
                - As nodes are removed from the cluster, those `Pods` are garbage collected
                - Deleting a `DaemonSet` will clean up the `Pods` it created.

            - Some typical uses of a `DaemonSet` are:
                - running a `cluster storage daemon` on every node
                - running a `logs collection daemon` on every node
                - running a `node monitoring daemon` on every node

            - In a simple case, one `DaemonSet`, covering all nodes, would be used for each type of daemon.
            - A more complex setup might use multiple `DaemonSets` for a single type of daemon, but with different flags and/or different memory and cpu requests for different hardware types.

            - `DaemonSet` template:

                    apiVersion: apps/v1
                    kind: DaemonSet
                    metadata:
                    name: fluentd-elasticsearch
                    namespace: kube-system
                    labels:
                    k8s-app: fluentd-logging
                    spec:
                    selector:
                    matchLabels:
                    name: fluentd-elasticsearch
                    template:
                    metadata:
                    labels:
                    name: fluentd-elasticsearch
                    spec:
                    tolerations:
                    # this toleration is to have the daemonset runnable on master nodes
                    # remove it if your masters can't run pods
                    - key: node-role.kubernetes.io/master
                    effect: NoSchedule
                    containers:
                    - name: fluentd-elasticsearch
                    image: quay.io/fluentd_elasticsearch/fluentd:v2.5.2
                    resources:
                    limits:
                    memory: 200Mi
                    requests:
                    cpu: 100m
                    memory: 200Mi
                    volumeMounts:
                    - name: varlog
                    mountPath: /var/log
                    - name: varlibdockercontainers
                    mountPath: /var/lib/docker/containers
                    readOnly: true
                    terminationGracePeriodSeconds: 30
                    volumes:
                    - name: varlog
                    hostPath:
                    path: /var/log
                    - name: varlibdockercontainers
                    hostPath:
                    path: /var/lib/docker/containers
        
        - **Service:**
            - The Kubernetes `service object` (not to be mixed with service in context of microservices) is responsible for handling communication inside or outside the cluster.
            - The Kubernetes `service object` has a `type` argument which determines its functionality.
            - The most common service types include:
                - **ClusterIP:**
                    - A `ClusterIP` service is the default Kubernetes service. It gives you a service inside your cluster that other apps inside your cluster can access. There is no external access.
                    - There are a few scenarios where you would use the Kubernetes proxy to access your services:
                        - Debugging your services, or connecting to them directly from your laptop for some reason
                        - Allowing internal traffic, displaying internal dashboards, etc.
                    - Because this method requires you to run `kubectl` as an authenticated user, you should NOT use this to expose your service to the internet or use it for production services.

                    - `ClusterIP` template:

                            apiVersion: v1
                            kind: Service
                            metadata:
                            name: my-internal-service
                            spec:
                            selector:
                            app: my-app
                            type: ClusterIP
                            ports:
                            - name: http
                            port: 80
                            targetPort: 80
                            protocol: TCP

                - **NodePort:**
                    - A `NodePort` service is the most primitive way to get external traffic directly to your service:
                        -  `NodePort`, as the name implies, opens a specific port on all the Nodes (the VMs), and any traffic that is sent to this port is forwarded to the service. 
                        - Basically, a `NodePort` service has two differences from a normal `ClusterIP` service:
                            - First, the type is `NodePort`. 
                            - There is also an additional port called the `nodePort` that specifies which port to open on the nodes. If you don’t specify this port, it will pick a random port. Most of the time you should let Kubernetes choose the port.
                    - There are many downsides to using `NodePorts`:
                        - You can only have one service per port
                        - You can only use ports `30000–32767`
                        - If your `Node/VM` IP address change, you need to deal with that
                        
                        - For these reasons, we don’t recommend using this method in production to directly expose your service. If you are running a service that doesn’t have to be always available, or you are very cost sensitive, this method will work for you. A good example of such an application is a demo app or something temporary.

                    - `NodePort` template:

                            apiVersion: v1
                            kind: Service
                            metadata:
                            name: my-nodeport-service
                            spec:
                            selector:
                            app: my-app
                            type: NodePort
                            ports:
                            - name: http
                            port: 80
                            targetPort: 80
                            nodePort: 30036
                            protocol: TCP
                
                - **LoadBalance:r**
                    - A `LoadBalancer` service is the standard way to expose a service to the internet.
                    - If you want to directly expose a service, this is the default method:
                        - All traffic on the port you specify will be forwarded to the service
                        - There is no filtering, no routing, etc. This means you can send almost any kind of traffic to it, like HTTP, TCP, UDP, Websockets or gRPC for example.

                    - The big downside is that each service you expose with a `LoadBalancer` will get its own IP address, and you have to pay for a `LoadBalancer` per exposed service, which can get expensive!

                    - `LoadBalancer` template:
                            
                            apiVersion: v1
                            kind: Service
                            metadata:
                            name: example-service
                            spec:
                            selector:
                            app: example
                            ports:
                            - port: 8765
                            targetPort: 9376
                            type: LoadBalancer

         - **Ingress:**
            - It sits in front of multiple services and act as a **smart router** or entrypoint into your cluster.
            - You can do a lot of different things with an `Ingress`, and there are many types of `Ingress controllers` that have different capabilities:
                -  Usually an `ingress controller` will spin up a HTTP(S) `Load Balancer` for you. This will let you do both path based and subdomain based routing to backend services. For example, you can send everything on `foo.yourdomain.com` to the `foo` service, and everything under the `yourdomain.com/bar/` path to the bar service

            - `Ingress` template:

                    apiVersion: networking.k8s.io/v1
                    kind: Ingress
                    metadata:
                    name: minimal-ingress
                    annotations:
                    nginx.ingress.kubernetes.io/rewrite-target: /
                    spec:
                    rules:
                    - http:
                    paths:
                    - path: /testpath
                    pathType: Prefix
                    backend:
                    service:
                    name: test
                    port:
                    number: 80

        - **Secret:**
            - Kubernetes `Secrets` let you store and manage sensitive information, such as passwords, OAuth tokens, and ssh keys.
            - Storing confidential information in a `Secret` is safer and more flexible than putting it verbatim in a `Pod definition` or in a `container image`.

            - To use a `Secret`, a `Pod` needs to reference the `Secret`.

            - Kubernetes provides several `builtin types` for some common usage scenarios. These types vary in terms of the validations performed and the constraints Kubernetes imposes on them.

                    Builtin Type	                            Usage
                    Opaque	                                    arbitrary user-defined data
                    kubernetes.io/service-account-token	        service account token
                    kubernetes.io/dockercfg	serialized          ~/.dockercfg file
                    kubernetes.io/dockerconfigjson	            serialized ~/.docker/config.json file
                    kubernetes.io/basic-auth	                credentials for basic authentication
                    kubernetes.io/ssh-auth	                    credentials for SSH authentication
                    kubernetes.io/tls	                        data for a TLS client or server
                    bootstrap.kubernetes.io/token	            bootstrap token data
            
            - `Secret` template:

                    apiVersion: v1
                    kind: Secret
                    metadata:
                    name: mysecret
                    type: Opaque
                    data:
                    username: 123
                    password: xyz
        
        - **ConfigMap:**
            - A `ConfigMap` is an API object used to store non-confidential data in key-value pairs. `Pods` can consume `ConfigMaps` as environment variables, command-line arguments, or as configuration files in a volume.

            - A `ConfigMap` allows you to decouple environment-specific configuration from your container images, so that your applications are easily portable.

            - You can write a `Pod` spec that refers to a `ConfigMap` and configures the `container(s)` in that `Pod` based on the data in the `ConfigMap`. The `Pod` and the `ConfigMap` must be in the same namespace.

            - `ConfigMap` template:
                    
                    apiVersion: v1
                    kind: ConfigMap
                    metadata:
                    name: game-demo
                    data:
                    # property-like keys; each key maps to a simple value
                    player_initial_lives: "3"
                    ui_properties_file_name: "user-interface.properties"

                    # file-like keys
                    game.properties: |
                    enemy.types=aliens,monsters
                    player.maximum-lives=5
                    user-interface.properties: |
                    color.good=purple
                    color.bad=yellow
                    allow.textmode=true
        
        - **PersistentVolume:**
            - Managing storage is a distinct problem from managing compute instances. The `PersistentVolume` subsystem provides an API for users and administrators that abstracts details of how storage is provided from how it is consumed. To do this, we introduce two new API resources: `PersistentVolume` and `PersistentVolumeClaim`.

            - A `PersistentVolume` (PV) is a piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using `Storage Classes`. It is a resource in the `cluster` just like a `node` is a `cluster` resource. `PVs` are volume plugins like `Volumes`, but have a lifecycle independent of any individual `Pod` that uses the `PV`. This API object captures the details of the implementation of the storage, be that NFS, iSCSI, or a cloud-provider-specific storage system.

            - A `PersistentVolumeClaim` (PVC) is a request for storage by a user. It is similar to a `Pod`. `Pods` consume `node` resources and `PVCs` consume `PV` resources. Pods can request specific levels of resources (CPU and Memory). Claims can request specific size and access modes (e.g., they can be mounted `ReadWriteOnce`, `ReadOnlyMany` or `ReadWriteMany`, see `AccessModes`).

            - While `PersistentVolumeClaims` allow a user to consume abstract storage resources, it is common that users need `PersistentVolumes` with varying properties, such as performance, for different problems. `Cluster` administrators need to be able to offer a variety of PersistentVolumes that differ in more ways than just size and access modes, without exposing users to the details of how those volumes are implemented. For these needs, there is the `StorageClass` resource.

            - `PersistentVolume` template:

                    apiVersion: v1
                    kind: PersistentVolume
                    metadata:
                    name: foo-pv
                    spec:
                    storageClassName: ""
                    claimRef:
                    name: foo-pvc
                    namespace: foo
                    ...

            - `PersistentVolumeClaim` template:
                    
                    apiVersion: v1
                    kind: PersistentVolumeClaim
                    metadata:
                    name: foo-pvc
                    namespace: foo
                    spec:
                    storageClassName: "" # Empty string must be explicitly set otherwise default StorageClass will be set
                    volumeName: foo-pv
                    ...

## GUIDES:
- **Deploy applications (Service):**
    1. Create a sample deployment and expose it on port 8080:
        - `kubectl create deployment hello-minikube --image=kicbase/echo-server:1.0`
        - `kubectl expose deployment hello-minikube --type=NodePort --port=8080`
    2. Check if it started:
        - `kubectl get services hello-minikube`
    3. Access the service:
        - In the web browser:
            - `minikube service hello-minikube`
            - Open the link provided
        - Or using `kubectl`:
            - `kubectl port-forward service/hello-minikube 7080:8080`
            - The application is now available at `http://localhost:7080/`
    4. Delete the service if not used anymore:
        - `kubectl delete service hello-minikube`

- **Deploy applications (Load Balancer):**
    1. access a LoadBalancer deployment:
        - `kubectl create deployment balanced --image=kicbase/echo-server:1.0`
        - `kubectl expose deployment balanced --type=LoadBalancer --port=8080`
    2. In another window, start the tunnel to create a routable IP for the ‘balanced’ deployment:
        - `minikube tunnel`
    3. To find the routable IP, run this command and examine the EXTERNAL-IP column:
        - `kubectl get services balanced`
        - Your deployment is now available at `<EXTERNAL-IP>:8080`

## COMMANDS:
- Install (on Linux): *( https://minikube.sigs.k8s.io/docs/start/ )*
    - `curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64`
    - `sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64`
    - `sudo snap install kubectl --classic`

- Staring a local cluster:
    - `minikube start`
    - `minikube dashboard` 
        - you need to deploy something first, to see anything!
        - open up a new terminal after this for work

- Enable metrics server:
    - `minikube addons enable metrics-server`

- Cluster management:
    - List all commands:
        - `minikube`
    - Check status:
        - `minikube status`
    - Pause Kubernetes without impacting deployed applications:
        - `minikube pause`
    - Unpause a paused instance:
        - `minikube unpause`
    - Halt the cluster:
        - `minikube stop`
    - Change the default memory limit (requires a restart):
        - `minikube config set memory 9001`
    - Browse the catalog of easily installed Kubernetes services:
        - `minikube addons list`
    - Create a second cluster running an older Kubernetes release:
        - `minikube start -p aged --kubernetes-version=v1.16.1`
    - Delete all of the minikube clusters:
        - `minikube delete --all`
    - Check all add-ons:
        - `minikube addons list`

- More basics:
    - List all commands: `kubectl`
    - Check config: `kubectl config view`
    - Show cluster info: `kubectl cluster-info`
    - Check running nodes: `kubectl get nodes`

- Using `kubectl` command-line tool:
    - `kubectl apply -f <KUBERNETES CONFIG FILE NAME>` 
        - This applies the changes of the kubernetes config file to your cluster, usually it means that a resource defined in the config file will get created or updated.
    - `kubectl get <KUBERNETES OBJECT TYPE> <-OPTIONAL: -n NAMESPACE->` 
        - Prints all resources from that resource type on your cluster
        - eg `kubectl get po -A`
    - `kubectl describe <KUBERNETES OBJECT TYPE> <OBJECT ID> <-OPTIONAL: -n NAMESPACE->` - Prints the events that happened to a specific resource
    - `kubectl logs <POD NAME> <-OPTIONAL: -n NAMESPACE->` 
        - Prints logs from a container. If the pod has multiple containers with different names, the container name also must be specified after the pod name
    - `kubectl delete <KUBERNETES OBJECT TYPE> <OBJECT ID> <-OPTIONAL: -n NAMESPACE->`
        - Deletes Kubernetes object
    - `kubectl create deployment nginx --image=nginx`
        - Deploy an application
        

## LINKS:
- Full documentation: https://kubernetes.io/docs/home/
- Full Kubernetes commands guide: https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands

- Minikube setup guide: https://minikube.sigs.k8s.io/docs/start/