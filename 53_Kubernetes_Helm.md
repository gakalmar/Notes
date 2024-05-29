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
    - a "container orchestration tool"
    - an open-source system for automating deployment, scaling, and management of containerized applications
    - groups containers that make up an application into logical units for easy management and discovery -> these can then be tested in different environments

- **Benefits of Kubernetes:**
    - Achieves **high availability, scalability and disaster recovery** of your app setup:
        - **High availablility and scalability:**
            - means using `replicas` for load balancing
            - there is no bottleneck in the flow of the processes, that would slow down performance
        - **Disaster recovery:** (self healing)
            - uses `etcd` to store states of the `nodes` to easily recover it in a new `node` (`etcd snapshots` stored remotely, not in the cluster!)
            - the app data is also stored externally! (in case the whole cluster would crash)
                - a backup cluster could also be set up to prevent this case
    - Benefits:
        - replication is done easily (just declare how many you need)
        - self-healing mechanism (handling crashed nodes/clusters, using backups with states internally and snapshots externally)
        - smart scheduling (decides on which worker node your request can run most effectively)

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
    - **Pods-Containers:**
        - a `Pod` is the smallest unit that the user can interact with (it is a wrapper of a container)
        - each `worker node` has multiple `pods`
        - a `pod` can have multiple containers, but it's usually **1 pod per application**
        - Each `pod` is assigned its own IP address by the virtual network (so they act as a server)
        - a `pod` is an abstraction layer for containers, that we use to interact with
        - a `pod` can die easily, but instantly gets replaced with a new one, but will get a new IP address: this is why `Services` are used, they are "docking units", that the pods use to interact with each other (so if a `pod` gets a new IP, it can still dock back to the same `Service`, so the replacement is unnoticed)
        - `Service`:
            - has a permanent IP address, that is used for the communication between pods
            - it also acts as a load balancer
    - **Limit & Request:**
        - **Request:** 
            - Describes what is the minimum resource (CPU & memory) required for a pod to start.
            - Kubernetes uses resource requests to make scheduling decisions, and it needs to make sure the request is fulfilled
        - **Limit:** 
            - Describes what is the maximum amount of resources (CPU and memory) that a pod can use.
            - Kubernetes uses resource limits to constrain the resource usage of containers, preventing any single container from using more than its allocated resources and affecting other containers, and for this it uses Limit

- **Minikube:**
    - a tool that lets you run a Kubernetes cluster on your own computer with minimal setup
    - The benefit is that it doesn't need a cloud provider to host your cluster, but it makes your computer slower, depending on the workload and size of the cluster

- **Basic architecture of a k8s cluster:**
    - made of a `Master node` and some `worker nodes`
        - in production environments in order to have a backup of the `master node`, there's usually more that 1 `master node` used

        - Each `worker node` must contain:
            - each `node` needs a **container runtime** (in our case it's the `docker runtime`)
            - the scheduler process is **kubelet** (Kubernetes process that interacts with both the `container` and the `node`)
                - `kubelet` starts the `pod` with the container inside and assign resources from the `node` to the `container`
            - **kube proxy** is also installed on every `node`, this forwards the requests from `services` to `pods` (`services` is what connects the nodes instead of direct IP addresses)
            - Apart from this, the `nodes` contain the `docker containers` that are running on them
        - The `master node` runs k8s essential processes:
            - eg `API Server` (also a container):
                - this is the cluster's gateway - the entrypoint to the k8s cluster, to which we can connect using the `UI` or the `CLI`, or through `API` (also authentication process is done by it)
            - `scheduler`:
                - ensures `Pod` placement based on the incoming requests to the `API server`
                - decides on which `worker node` the next `pod` should be started on
                - the actual execution of the request is done by the `kubelet`, the `scheduler` only makes the decision on where it should be done
            - `controller manager`:
                - keeps an overview of what is happening on the cluster
                - detects state changes in the cluster (eg when a pod dies/crashes and needs replacement)
            - `etcd` ("cluster brain"):
                - key-value storage that holds the current state of the cluster
                - backups are made using snapshots of this
                - the application data is not stored here!

    - `virtual network`:
        - this is what connects the `master node` to the `worker nodes`
        - creates a unified machine from all the nodes

    - **Example cluster:**
        - 2 master nodes and 3 worker nodes
        - This can be later expanded if there is a need for it

- **Kubernetes Objects:**
    - K8s consists of objects, that can be created from the CLI or from `yaml` *template files*
        - **CLI**: not recommended as can't keep track of versions
        - **template files**: allow version control
    - **K8s Objects:**
        - **Core components (Nana):**
            - `Pod`
            - `Service` / `Ingress`
            - `ConfigSet` / `Secret`
            - `Volume`
            - `Deployment` / `StatefulSet`
        - **Pod:**
            - **Definition:**
                - `Pods` are the smallest deployable units of computing that you can create and manage in Kubernetes
                - A `Pod` is a group of one or more containers, with shared storage and network resources, and a specification for how to run the containers. 
                - Its contents are always co-located and co-scheduled, and run in a shared context.
                - It is similar to a *group of Docker containers* with shared namespaces and shared filesystem volumes.
            - **You don't need to create them manually:**
                - create them using workload resources such as `Deployment` or `Job` (this is for stateless Apps (eg. without a DB))
                - If your Pods need to track state, consider the `StatefulSet` resource (this is for handling stateful Apps with Databases)
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
            - We don't want to just rely on 1 node, we have to have backups, so there's no downtime -> we can specify how many replicas we want to make of our app node:
                - We create `deployments`, not `pods` directly, because here we can specify the replica numbers (we can also scale up or down replica numbers)
                - `deployments` are the blueprints for the app's `pods` (they are another abstraction layer, so now we have `container` -> `pod` -> `deployment`)
                - the issue is, we can't replicate a whole node, because we can't replicate databases (for this, we use `statefulSet`):
                    - so if we have a stateless App (eg no DB) -> we can use `Deployment`
                    - if we have a stateful App (eg we need a DB's state to be tracked for replicas) -> we can use `StatefulSet`

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
            - The Kubernetes `service object` (not to be mixed with service in context of microservices) is responsible for handling communication inside or outside the cluster (we mostly use it for internal communications, for external we have `ingress`)
            - The Kubernetes `service object` has a `type` argument which determines its functionality.
            - We use these as a docking bay for a `pod`, so that they can communicate with each other:
                - each `pod` has an IP address, but when that `pod` gets replaced (because it died and needs replacement), a new IP address gets assigned
                - In order for `pods` maintain communication, they are connected with `services`, that have their own `static IP address`
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
                
                - **LoadBalancer:**
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
            - It's very similar to `services`, but this is for **external connections** -> we can connect to these from outside the cluster
            - It sits in front of multiple `services` and act as a **smart router** or entrypoint into your cluster.
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
            - Kubernetes `Secrets` let you store and manage sensitive information, such as passwords, OAuth tokens, and ssh keys, so that you don't need to include confidential data in your application code
            - Storing confidential information in a `Secret` is safer and more flexible than putting it verbatim in a `Pod definition` or in a `container image`.
            - The non-confidential version of a `secret` is a `configmap`

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
            - A `ConfigMap` is an API object used to store non-confidential data in key-value pairs. `Pods` can consume `ConfigMaps` as environment variables, command-line arguments, or as configuration files in a volume (used during either application initialization or runtime).

            - The stored data is used to adjust values assigned to configuration parameters, for example, you can download and run the same container image to spin up containers for the purposes of local development, system test, or running a live end-user workload.
            
            - For confidential data we use `secrets` (see above!)

            - A `ConfigMap` allows you to decouple environment-specific configuration from your container images, so that your applications are easily portable. Otherwise we would have to build and deploy our apps again, when we change something inside the app's configuration

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

            - `PVs` are not namespaced, they are available for the whole cluster!

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
        
        - **Volumes:**
            - A `Volume` is a component that allows data to persist and be shared across container restarts and among multiple containers within a pod:
                - A Kubernetes volume exists as long as the pod containing it exists. Unlike the temporary local storage of a container, a volume can persist data across container restarts and is accessible to all containers within the pod.
                - Volumes are defined at the pod level, and their lifecycle is tied to the lifecycle of the pod
            - **Volume types:**
                - `emptyDir`: starts as an empty volume but persists data as long as the pod is running
                - `hostPath`: mounts a file or directory from the host node’s filesystem into your pod
                - `nfs`
                - `configMap` (see separate section)
                - `secret` (see separate section)
            - Volumes are declared in the pod's configuration file under the volumes field, and then they are mounted into containers within the pod
            - **Use cases:**
                - Sharing Data Between Containers in a Pod:
                    - Volumes can be used to share files between containers running within the same pod. For instance, one container might write logs or output data to a volume that another container processes or exports.
                - Data Persistence:
                    - To ensure that data persists beyond the life of a pod or for data that needs to survive pod restarts and failures, persistent volumes (PVs) and persistent volume claims (PVCs) are used. These allow for data to be stored in a way that is independent of the pod lifecycle.
                - Configurations and Secrets:
                    - `configMap` and `secret volumes` are used to store configuration data and sensitive information, respectively. These volumes can be mounted into pods, allowing containers to use configurations and secrets without hard-coding them into the container images or pod definitions.
                - Storing Logs and Other Temporary Data:
                    - `emptyDir` volumes are ideal for temporary data that needs to be shared between containers in a pod, such as logs, caches, or files that should not persist once the pod is deleted.
                - Accessing Storage Systems:
                    - Volumes allow pods to access various types of external storage systems like NFS, cloud storage services (e.g., AWS EBS, Azure Disk), and networked storage systems, facilitating data sharing and data persistence in distributed systems.
                - Running Stateful Applications:
                    - Stateful applications like databases can use persistent volumes to store database files, ensuring that the data remains available even if the pod needs to be relocated to a different node.

        - **StorageClass:**
            - A `storageClass` provides a way to describe the "classes" of storage available in a cluster. It acts as a mechanism to dynamically provision storage resources based on the needs of the applications:
                - it is used for *managing storage solutions* in a **flexible and efficient manner**, aligning storage provisioning with application requirements and simplifying the management of storage resources across the cluster
            - **What it does:**
                - allows for **dynamic provisioning** of storage resources, meaning it automates the creation of storage volumes as they are required by applications, based on predefined templates of storage configurations.
                - It **abstracts the details** of how storage is provided from how it is consumed, enabling administrators to define different types of storage (e.g., performance levels, backup policies, or disk types) under familiar names like "fast" or "slow".
                - **Customization and flexibility:** Administrators can define multiple `StorageClasses` within a cluster, each tailored for different use cases or performance requirements. This allows users to select the most appropriate type of storage for their specific applications by simply referencing the `StorageClass` name in their `Persistent Volume Claims` (`PVCs`).
            - **Key Features:**
                - `Provisioner`:
                    - Each `StorageClass` includes a provisioner that determines what volume plugin is used for provisioning the storage. This could be internal to Kubernetes or it could be from external sources like `AWS Elastic Block Store` (`EBS`), Google Persistent Disk, or a network file system (NFS).
                - `Parameters`:
                    - Administrators can specify parameters within a `StorageClass` to configure the volume plugin, tailoring options such as disk format, replication levels, or IOPS (Input/Output Operations Per Second) for a specific storage type.
                - `Reclaim Policy`:
                    - The reclaimPolicy attribute controls what happens to the underlying physical storage when a user deletes the associated `Persistent Volume Claim`. Typical policies include Delete (where the volume is deleted along with the `PVC`) and Retain (where the volume is retained after the `PVC` is deleted).
                - `Volume Binding Mode`:
                    - This attribute controls the timing of volume binding and provisioning. It can be set to Immediate (default) where the volume provisioning occurs as soon as the `PVC` is created, or `WaitForFirstConsumer` where provisioning is delayed until a pod actually needs it
            - **Use cases:**
                - **Highly Available Applications:**
                    - Use specific `StorageClasses` that configure more durable and redundant storage options.
                - **Performance-Sensitive Applications:**
                    - Choose `StorageClasses` with higher IOPS or faster disk technologies for databases or other I/O-intensive applications.
                - **Cost Management:**
                    - Employ `StorageClasses` that map to cost-effective storage solutions for less critical data.

        - **StatefulSets:**
            - `StatefulSets` are a workload API object used for managing stateful applications. They manage the deployment and scaling of a set of Pods, and unlike `Deployments`, they provide guarantees about the ordering and uniqueness of these Pods
            - **What they do:**
                - `StatefulSets` are specifically designed for applications that require a stable, unique network identifier, stable persistent storage, and ordered deployment and scaling.
                - `StatefulSets` maintain a strict order with regards to how Pods are created, scaled, and deleted. They are created sequentially, and also deleted in reverse order during scaling down.
                - Each Pod in a `StatefulSet` derives its hostname from the name of the `StatefulSet` and a unique ordinal for each Pod (e.g., myapp-0, myapp-1). This naming convention remains consistent, even if the Pods are rescheduled to new IPs.
                - `StatefulSets` use `Persistent Volumes` that can be mounted to the Pods based on the same unique ordinal associated with each Pod. If a Pod is rescheduled, it can reattach to the same `Persistent Volume`, preserving its state.

        - **Comparison (`Volume`, `PersistentVolume`, `StorageClass`, `StatefulSet`):**
            - `StatefulSets` manage applications that require specific storage (`Persistent Volumes`), which are defined by their characteristics (`StorageClasses`), and `Volumes` provide temporary storage for other less critical needs

- **Namespaces:**
    - **Basics:**
        - In Kubernetes, namespaces provide a mechanism for isolating groups of resources within a single cluster
        - Names of resources need to be unique within a namespace
        - Namespaces are intended for use in environments with many users spread across multiple teams, or projects
        - Namespaces cannot be nested inside one another and each Kubernetes resource can only be in one namespace
    - **Kubernetes starts with four initial namespaces:**
        - `default`:
            - Kubernetes includes this namespace so that you can start using your new cluster without first creating a namespace.
        - `kube-node-lease`:
            - This namespace holds Lease objects associated with each node. Node leases allow the kubelet to send heartbeats so that the control plane can detect node failure.
        - `kube-public`:
            - This namespace is readable by all clients (including those not authenticated). This namespace is mostly reserved for cluster usage, in case that some resources should be visible and readable publicly throughout the whole cluster. The public aspect of this namespace is only a convention, not a requirement.
        - `kube-system`:
            - The namespace for objects created by the Kubernetes system

- **Service Accounts:**
    - **What is it?**
        - Service accounts in Kubernetes are a type of user account that is intended for processes in pods to interact with the Kubernetes API. They are an essential aspect of managing access control to the resources and services running in your cluster.
        - **Purpose and Use:**
            - Service accounts are used by processes within pods to interact with the Kubernetes API. This is different from user accounts, which are meant for humans or external processes managing resources.
            - Each namespace in Kubernetes comes with a default service account, but you can create additional service accounts specific to your needs.
        - **Management:**
            - Service accounts can be assigned specific permissions using role-based access control (RBAC) policies, which define what resources a service account can access and the actions it can perform.
        - **Automatic Mounting of API Credentials:**
            - Kubernetes automatically mounts credentials (tokens) for accessing the API into pods using service accounts. These credentials are stored as `secrets`.
            - You can disable the automatic mounting of these tokens on a per-pod basis if needed.
        - **Use with Applications:**
            - When you deploy applications that need to interact with the Kubernetes API, you can specify which service account the application should use. This helps in limiting access to the cluster based on what the application needs to do, enhancing security.
            - For example, if an application only needs to read information about pods, you can create and assign a service account with permissions limited to reading pod information.
        - **Security Implications:**
            - It's important to manage service accounts carefully, as they can provide significant access to your Kubernetes environment. Always adhere to the principle of least privilege, assigning only the necessary permissions to a service account.
        - **Best Practices:**
            - Do not use the default service account bound to a pod for your applications unless it suits your permission requirements, as it may have broader permissions than necessary.
            - Configure precise and minimal permissions for each service account to minimize potential security risks.
    - **Role-based access control (RBAC):**
        - Role-based access control (RBAC) is a method of regulating access to computer or network resources based on the roles of individual users within your organization
        - uses the rbac.authorization.k8s.io API group to drive authorization decisions, allowing you to dynamically configure policies through the Kubernetes API
        - The RBAC API declares four kinds of **Kubernetes objects**: 
            - `Role`:
                - contains rules that represent a set of permissions
                - Permissions are purely additive (there are no "deny" rules)
                - A Role always sets permissions within a particular namespace
            - `ClusterRole`:
                - it is a non-namespaced resource
                - The resources have different names (`Role` and `ClusterRole`) because a Kubernetes object always has to be either namespaced or not namespaced; it can't be both.
                - They haveseveral uses:
                    - define permissions on namespaced resources and be granted access within individual namespace(s)
                    - define permissions on namespaced resources and be granted access across all namespaces
                    - define permissions on cluster-scoped resources
                - `Role` vs `Clusterrole`:
                    - If you want to define a role **within a namespace**, use a `Role`
                    - if you want to define a role **cluster-wide**, use a `ClusterRole`
                - **Aggregated ClusterRoles:**
                    - You can aggregate several `ClusterRoles` into one `combined ClusterRole`
                    - A controller, running as part of the cluster control plane, watches for `ClusterRole` objects with an `aggregationRule set`. 
                    - The `aggregationRule` defines a label selector that the controller uses to match other `ClusterRole` objects that should be combined into the rules field of this one.
            - `RoleBinding`:
                - grants the permissions defined in a role to a user or set of users
                - holds a list of subjects (users, groups, or service accounts), and a reference to the role being granted. A RoleBinding grants permissions within a specific namespace
            - `ClusterRoleBinding`:
                - same as role binding, but it's not namespace specific, so it's cluster-wide
                - If you want to bind a `ClusterRole` to all the namespaces in your cluster, you use a `ClusterRoleBinding`

- **Liveness and readiness probes:**
    - `Liveness` and `readiness probes` are mechanisms in Kubernetes used to manage how containers in pods are handled. They help Kubernetes make decisions about when to restart a container or when to route traffic to a pod. 

    - **Liveness Probes**
        - Liveness probes are used to know when to restart a container. The main purpose of a liveness probe is to check if an application inside a container is still running. If the liveness probe fails, Kubernetes assumes that the container is in a broken state and restarts it automatically.

        - **Example Use Case:**
            - An application might be running, but it's deadlocked, with all threads hung. Although the application process is still running, the application is not functioning as expected. A liveness probe could catch this by checking some type of "I am alive" signal at a set interval. If this check fails, Kubernetes restarts the container to try to restore normal operation.

    - **Readiness Probes**
        - Readiness probes are used to determine when a container is ready to start accepting traffic. Essentially, the readiness probe is meant to check if the application is ready to serve requests. If the readiness probe fails, Kubernetes won’t send traffic to the pod until it passes.

        - **Example Use Case:**
            - A web server is deployed within a container, and it starts up with some initial load time because it might be loading large data sets or configurations. Even though the container is running, it's not yet ready to serve traffic. A readiness probe can check the HTTP endpoint or a specific condition that returns success only when the server is truly ready to handle requests.

## AWS EKS (Elastic Kubernetes Service)
- **What is it?**
    - A managed k8s cluster/service:
        - AWS manages Master Nodes
            - Creates the master node and install all the necessary apps (Container Runtime, Master Processes)
        - Scaling and Backups
        - You can focus on `deployment`, and create only the `worker nodes`

- **How does it work?**
    1. Setup / preparation:
        - Create a `VPC`
        - Create an `IAM` Role with `Security Group`
            - Means: Create an AWS **user** (=`IAM role`) with a **list of permissions** (=`SG`)
    2. Create the `Control Plane` of the Cluster (Create the Master Nodes):
        - Create using the `IAM Role`:
            - cluster name, k8s version
            - region and VPC for the cluster
            - set security
    3. Create the `Worker Nodes` and connect them to the cluster:
        - Nodes will be `EC2` instances
        - Create as a `Node Group`:
            - select the cluster it will get attached to
            - define `SG`
            - select instance type and resources
            - Autoscaling option (max and min number of nodes)
        - Connect to the cluster from your local machine:
            - deploy apps to the cluster using `kubectl`
    
    - We can simplify this process with **eks control tool**: `eksctl` (CLI for AWS EKS) (see below in the guides section!)

## HELM
- What is `Helm`?
    - It's a package manager for K8s, that helps you manage K8s apps through `charts` (packages of pre-configured K8s resources)
    - It is like **an extension  to the basic k8s configuration files**. It makes it available to use variables and download other packages very easily. It helps us with 2 main components:
        - We can create a `values.yaml` file to collect all our **Configurations** into 1 single file:
            - we type `${{.Values.delpoyment.replicas}}` or `${{.Values.service.type}}` in the original yaml files instead of hard-coding the values, and we specify these in the `values` file
        - We use a **template**, or in Helm's terms a `chart`:
            - the `chart` consists of all the files we are "templating" (=describing in the confirguration), it's essencially a bundle of `yaml` files that we can use in our project

- `Chart`:
    - A `Chart` is a collection of files that describe a related set of Kubernetes resources.
    - Charts are created as files laid out in a particular directory tree. They can be packaged into versioned archives to be deployed.
    - **The Chart File Structure:**
        - eg:

                wordpress/
                Chart.yaml          # A YAML file containing information about the chart
                LICENSE             # OPTIONAL: A plain text file containing the license for the chart
                README.md           # OPTIONAL: A human-readable README file
                values.yaml         # The default configuration values for this chart
                values.schema.json  # OPTIONAL: A JSON Schema for imposing a structure on the values.yaml file
                charts/             # A directory containing any charts upon which this chart depends.
                crds/               # Custom Resource Definitions
                templates/          # A directory of templates that, when combined with values,
                                    # will generate valid Kubernetes manifest files.
                templates/NOTES.txt # OPTIONAL: A plain text file containing short usage notes
    
    - **Chart types:**
        - We can add this to the `type` field of the `Chart.yaml` file. There are 2 options:
            - `application`
                - the default type and it is the standard chart which can be operated on fully
            - `library`
                - provides utilities or functions for the chart builder. 
                - A `library chart` differs from an application chart because it is not installable and usually doesn't contain any resource objects.

- `Repository`:
    - A Repository is the place where charts can be collected and shared. (like GitHub for Kubernetes packages)

- `Release`:
    - A Release is an instance of a chart running in a Kubernetes cluster. One chart can often be installed many times into the same cluster. And each time it is installed, a new release is created. 
    - Consider a MySQL chart: If you want two databases running in your cluster, you can install that chart twice. Each one will have its own release, which will in turn have its own release name.

- **Helm Architecture:**
    - Helm Client:
        -  command-line client for end users, responsible for:
            - Local chart development
            - Managing repositories
            - Managing releases
            - Interfacing with the Helm library:
                - Sending charts to be installed
                - Requesting upgrading or uninstalling of existing releases
    - Helm Library:
        - provides the logic for executing all Helm operations. 
        - It interfaces with the Kubernetes API server and provides the following capability:
            - Combining a chart and configuration to build a release
            - Installing charts into Kubernetes, and providing the subsequent release object
            - Upgrading and uninstalling charts by interacting with Kubernetes
    - Both Client and Library use the `Go` language

- **Basic commands (Helm):**
    - Getting Started 1. (install and use existing chart):
        - Install:
            - `curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3`
            - `chmod 700 get_helm.sh`
            - `./get_helm.sh`
        - Initialize a Helm Chart Repo:
            - `helm repo add bitnami https://charts.bitnami.com/bitnami`
        - List charts available for install:
            - `helm search repo bitnami`
        - Install a sample chart:
            - `helm repo update`
            - `helm install bitnami/mysql --generate-name`
            - Note:
                - Whenever you install a chart, a new release is created. So one chart can be installed multiple times into the same cluster, and each can be independently managed and upgraded.
            - Alternatively we can name the release instead of generating a name for it:
                - `helm install happy-panda bitnami/wordpress`
        - Use this to check the chart:
            - `helm show chart bitnami/mysql`
        - Check list of all deployed releases:
            - `helm list`
        - Now we can uninstall, using the chart's NAME:
            - `helm uninstall mysql-1716386300`
    - Getting started 2. (by creating your own chart):
        - `helm create mychart`
        - Remove everything from `/templates` folder to start from scratch:
            - `rm -rf ./templates/*` (make sure to be inside your helm project folder)
        - Create templates:
            - `ConfigMap` in `./templates/configmap.yaml` file:

                    apiVersion: v1
                    kind: ConfigMap
                    metadata:
                      name: mychart-configmap
                    data:
                      myvalue: "Hello World"
            
        - Now that we have a template, we can install it with:
            - `helm install test1 ./` # note "full-coral" is the name we want to use for the chart, and `./` refers to the dir we are working in (the project's root folder)
        - retrieve the release:
            - `helm get manifest test1` (gets what's inside the yaml file)
        - now we can uninstall it:
            - `helm uninstall test1`

        - We can alter the previous `ConfigMap` to be able to add the `name` field as an input (`template directive`):

                apiVersion: v1
                kind: ConfigMap
                metadata:
                    name: {{ .Release.Name }}-configmap
                data:
                    myvalue: "Hello World"
        
        - now we can install it again, check the manifest and delete:
            - `helm install test2 ./`
            - `helm get manifest test2`
            - `helm uninstall test2` 
        
        - extra tip:
            - `helm install --debug --dry-run goodly-guppy ./mychart`
                - using this, we will be able to check the template without actually installing


    - `helm install <chartName>` - this uses the `values` file to fill all the `configuration` files, and creates the cluster (we can also specify the values file with the `--values` flag, eg `helm install --values=values.yaml <chartName>`)
    - `helm upgrade <chartName>` - after we make any changes, we can use this command to update our app
    - `helm rollback <chartName>` - in case we made a mistake, we can undo that with this command (go back to the last working version)
    - `helm package <repoIndex> <chartName>` (?) - push (`deploy`) the project's configuration (`chart`) for others to use it

    - `helm search hub <value>`: 
        - searches the Artifact Hub *( https://artifacthub.io/ )*
        - eg `helm search hub wordpress`
    - `helm search repo`:
        - searches the repositories that you have added to your local helm client (search is done over local data)

## GUIDES:
- **General tips:**
    - Create a VPC, then create a cluster first:
        - create a VPC (not necessary!)
        - create yaml file for cluster (see resources - with or without existing VPC)
        - `eksctl create cluster -f cluster.yaml`
    - after you're done, make sure to update your context like this:
        - `aws eks update-kubeconfig --region eu-west-2 --name gk-cluster`
    - or swap to minikube context:
        - `kubectl config use-context minikube`

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

- **Deploy Google's Hello App and setting up an ingress for it:**
    - Follow instructions in this link: https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/

        1. Enable the NGINX Ingress controller:
            - `minikube addons enable ingress`
            - verify: `kubectl get pods -n ingress-nginx`
        2. Deploy a hello, world app:
            - `kubectl create deployment web --image=gcr.io/google-samples/hello-app:1.0` #`web` is the name
            - verify: `kubectl get deployment web`
        3. Expose deployment: 
            - `kubectl expose deployment web --type=NodePort --port=8080`
            - verify: `kubectl get service web`
        4. Visit the Service via NodePort:
            - `minikube service web --url`
                - this gets you an IP with a port, eg `http://172.17.0.15:31637`
            - verify itt works: `curl http://172.17.0.15:31637` (or in the browser)
        5. Create an Ingress:
            - `kubectl create ingress ingressname --rule="/=web:8080"`
            - check what was created: `kubectl edit ingress ingressname`
            - or : `kubectl get ingress`
        6. Modify `/etc/hosts` file:
            - Add this line: `127.0.0.1       minikube-test.localhost` # instead of just being localhost
        7. Open tunnel:
            - `minikube tunnel` # now we can access the minikube through the IP (`127.0.0.1`)

    - Create a second Deployment (=Add a second service?):
        - Follow instructions in this link: https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/

- **Create a k8s cluster in AWS EKS, using `eksctl`:**
    0. Install `eksctl` (if necessary):
        - `curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp`
        - `sudo mv /tmp/eksctl /usr/local/bin`
        - check if it was installed: `eksctl version`
    
    1. Create a `VPC` and 2 `Subnets` inside:
        - We can create with `VPC & More`:
            - create 2 subnets (public)
            - after it's done go to each subnet / Actions / edit -> enable auto IP
        - Or do manually:
            - CIDR range is set to `10.0.0.0/16` for `VPC`
            - CIDR range is set to `10.0.0.0/17` for `Subnet 1` (pick a specific availability zone!)
            - CIDR range is set to `10.0.128.0/17` for `Subnet 2` (pick a **different** availability zone!)
    
    2. Create cluster in AWS console:
        - **OPTION 1:**
            - Create with `yaml` file:
                - `eksctl create cluster -f cluster.yaml` (yaml file in resources!)
                    - remove `vpc` section, if you want to create a new one for it
                        
        - **OPTION 2:**
            - Default command with default values:
                - `eksctl create cluster` (user credentials need to be set up!)
            - Other flags we can add: (using `\` at the end of each line!)
                - `--name test-cluster`
                - `--version 1.29` (k8s version)
                - `--region eu-west-2` (specify region)
                - `--nodegroup-name my-nodes`
                - `--node-type=t3.medium` (specify ec2 types also)
                - `--nodes 2` (the number of worker nodes to be created)
                - `--vpc-public-subnets=subnet1-ID,subnet2-ID` (add to a previously created VPC's subnets instead of creating a new one for it - you need as many as many node you create)
                subnet-0e2dc3341147908b7
        
    3. Update config, so that it works with this cluster:
        - OPT1: `aws eks --region eu-west-2 update-kubeconfig --name gk-cluster`
        - OPT2: `aws eks update-kubeconfig --region eu-west-2 --name gk-cluster`

    4. Delete the cluster (after you're done!):
        - Delete cluster: `eksctl delete cluster --name test-cluster`

- **Deploy an app on the cluster:**
    1. Create a Deployment:
        - **OPTION 1:**
            - Create with `yaml` file:
                - `kubectl apply -f deployment.yaml` (yaml file in resources!)                   

        - **OPTION 2:**
            - `kubectl create deployment my-deployment-gk --image=ubuntu:alpine`

    2. Get some information about the running deployments on the cluster.
        - `kubectl get pods`
        - `kubectl get deployments`
        - `kubectl describe deployment <deployment_name>`
        - Check nodegroups:
            - `eksctl get nodegroup --cluster gk-cluster-7 --region eu-west-2`

    3. Check the events of the deployment.
        - `kubectl get events`
        - `kubectl get events --field-selector involvedObject.name=<deployment_name>`

    4. Scale up the number of pods of the deployment to a minimum number of 6.
        - `kubectl scale --replicas=6 deployment <deployment_name>`

    5. Add another node to the cluster:
        - Adding a new node to an existing AWS EKS cluster can be done by either **scaling up an existing node group** or **creating a new node group** with the desired instance types and sizes. We are doing a new node group now:
        - **OPTION 1:**
            - Create with `yaml` file:
                - `eksctl create nodegroup -f nodegroup.yaml` (yaml file in resources!)
       
        - **OPTION 2:**
            - `eksctl create nodegroup`
            - Possible flags:
                - `--cluster=gk-cluster`
                - `--name=gk-nodegroup-2`
                - `--node-type=t3.medium`
                - `--nodes=1`

    6. Delete the deployment:
        - `kubectl delete deployment alpine-deployment --cascade` (cascasde deletes the pods as well)

- **Kubernetes networking:**
    0. Useful commands:
        - `kubectl get namespaces`
        - `kubectl get namespaces <name>` (overview)
        - `kubectl describe namespaces <name>` (detailed overview)
        - `kubectl delete namespaces <namespace-name>` (it also deletes everything under it!)
    
    1. Create a new namespace using a `yaml` file (yaml file in resources):
        - `kubectl create -f namespace-1.yaml`
    
    2. Install nginx with Helm:
        - Install helm:
            - `curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash`
        - Add the Nginx Stable Helm Chart Repository:
            - `helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx`
            - `helm repo update`
        - Install Nginx Using Helm:
            - `helm install nginx-ingress ingress-nginx/ingress-nginx --namespace kubernetes-network`
            - verify: 
                - `kubectl get pods --namespace kubernetes-network`
                - `helm list --namespace kubernetes-network`
    
    3. Create a pod in the kubernetes-network namespace with `curl` installed:
        - Create a pod.yaml file and apply it (sample in resources! use the one with namespace!):
            - `kubectl apply -f pod.yaml`
        - Get a shell to the running container:
            - `kubectl exec --stdin --tty shell-demo -- /bin/bash`
            - verify: `kubectl get pods --namespace kubernetes-network`
        - To step into the pod:
            - `kubectl exec -it curl-pod -n kubernetes-network -- /bin/sh`

    4. Do the same, but remove the `namespace` line from the pod's yaml file!
        - Maybe it's also a good idea to give it a different name

    5. Create a new deployment, that uses an `nginx` image in the new namespace:
        - `yaml` file in the resources (use the deployment-nginx!)

    6. Expose service:
        - `kubectl expose deployment <deployment name>  --type=LoadBalancer  --name=<service name> -n kubernetes-network`

    7. Make `curl` requests to both:
        - find service names:
            - `kubectl get svc -A` (you will need the name and the port, where it's exposed!)
        - `exec` into the pods to make the requests:
            - `kubectl exec -it shell-demo -n kubernetes-network -- /bin/sh`
                - then from inside:
                    - Local:
                        - `curl <LoadBalancer name>:<port>`
                    - Non-local:    
                        - `curl <LoadBalancer name>.<namespace name>.svc.cluster.local:<port>`
            - `kubectl exec -it curl-pod-2 -- /bin/sh`
                - same again

- **Kubernetes RBAC:**
    1. Set up VPC with 2 public subnets
        - CIDR range subnet 1: `10.0.1.0/24`
        - CIDR range subnet 2: `10.0.2.0/24`

        - Set subnet settings to auto-assign IP!
        - Set inbound rules to `SSH` from anywhere, and add HTTP & HTTPS from your IP
    
    2. Create cluster with `yaml` file:
        - use `cluser-rbac.yaml` version (replace subnet ids and zones if different!)

    3. Create a Service Account:
        - Use `service-account.yaml` file in resources!
        - `kubectl apply -f service-account.yaml`
        - verify: `kubectl get serviceaccount my-service-account -n default`
    
    4. Create a Role:
        - get `yaml` file from resources (`role-pod.yaml`)
            - thsi role allows basic operations on pods
        - `kubectl apply -f role-pod.yaml`
        - verify: `kubectl describe role pod-manager -n default` (pod-mager is the name of the pod)
    
    5. Role binding:
        - grants the permissions defined in a role to a user, group, or service account. 
        - This step will bind the `pod-manager` role you created to the `my-service-account` service account:
            - create `role-binding.yaml` file (refer to resources!)
            - apply: `kubectl apply -f role-binding.yaml`
            - verify: `kubectl describe rolebinding pod-manager-binding -n default`
    
    6. Create a Pod Based on an Image Containing the Kubectl Command: # Create deployment instead
        - Create pod with `yaml` file (use `pod-kubectl.yaml`):
            - apply: `kubectl apply -f pod-kubectl.yaml`
            - verify: `kubectl get pods`
            - we can connect to it once it's in a `running` state with:
                - `kubectl exec -it kubectl-pod -- /bin/bash`
    
    7. Create a Service for Nginx:
        - Create the `yaml` file for the nginx `service`!
            - use `service-nginx.yaml` from resources
            - apply `kubectl apply -f service-nginx.yaml`
                - If it gets created, you can still create delete it with:
                    - `kubectl delete service nginx-service` (I didn't change its name, just the filename to `service-nginx`!)

            - watch the outcome:
                - Since the service account attached to your Pod does not have permission to create services, **this command should fail!**
                - But because I'm using `aws cli` as an admin, these priviliges get inherited, so I can still do it (but I shuldn't if I was a regular user!)
                - So in order to test it, we need to step into the pod: 
                    - `kubectl exec -it kubectl-pod -- /bin/bash`
                    - Then from there, attempt to create the `nginx-service`:
                        - create new yaml file and the apply:
                            - `kubectl apply -f service-nginx.yaml` (I couldn't do this, because the pod doesn't use `nano` or `sudo`, so I skipped the test)
    
    8. Create a pod:
        - Create the `yaml` file (use `pod-test.yaml`)
        - Apply: `kubectl apply -f pod-test.yaml`
        - Verify: `kubectl get pods`
        - This should work correctly as we had priviliges set for this

    9. Test Pod Creation in Another Namespace:
        - This step is designed to test whether the pod-manager role restricts creating pods outside of the default namespace
        - This step should also fail, since the `Role` is not a `ClusterRole`, therefore it is attached to a specific namespace:
            - Create a new `namespace`:
                - `kubectl create namespace test-namespace`
                - then using the `pod-test-namespace.yaml` file, create it:
                    - `kubectl apply -f test-pod-namespace.yaml`

- **EKS persistency with EBS:** (second solution with Terraform in Terraform file!)
    1. Set up VPC and cluster as before
        - don't forget to set subnet "auto allocate IP"!
        - dont' forget to update the SG to allow HTTP and SSH!
    2. Create a Storage:
        - You need to create a 5 GB `EBS volume` and an `AWS EBS StorageClass` in your cluster. The `EBS volume` will serve as persistent storage for your PostgreSQL database:
            - Create an `EBS Volume`:
                - In AWS management console, go to EC2, then to the `Volumes` tab. 
                - Create volume with these settings:
                    - `General Purpose SSD gp3`
                    - Size: `5 GiB`
                    - make sure to use the same availability zone az the cluster
                    - name it after creation if it can't be named during the creation
            - Create a `StorageClass`:
                - Create it with a `yaml` file (use `storage-class.yaml` in the resources!)
                    - apply: `kubectl apply -f storage-class.yaml`
    
    3. Create a `Persistent Volume` and `PersistentVolumeClaim`
        - `Persistent Volume` with `yaml`:
            - use `persistent-volume.yaml` in resources
                - update volumeID with `EBS volumeID`
            - Apply: `kubectl apply -f persistent-volume.yaml`
        - `PersistentVolumeClaim` with `yaml`:
            - use `persistent-volume-claim.yaml` in resources:
            - Apply: `kubectl apply -f persistent-volume-claim.yaml`
        - Verify both:
            - `kubectl get pv`
            - `kubectl get pvc`

    4. Create a `PostgreSQL` `Deployment`:
        - Define the Deployment:
            - Create the `yaml` file for the `Deployment` (use `deployment-postgres.yaml`)
            - Apply: `kubectl apply -f deployment-postgres.yaml`
            - verify creation: `kubectl get pods` (Wait for `running` state!)
            - verify DB connectivity: `kubectl port-forward <pod-name> 5432:5432`

    5. Create a Service:
        - Create a Service for `PostgreSQL`:
            - Create the `yaml` file for the `Service` (`service-postgres.yaml`)
                - Apply: `kubectl apply -f postgres-service.yaml`
                - Verify: `kubectl get service postgres-service`

    6. Test Data Persistence:
        - Connect to PostgreSQL:
            - `kubectl port-forward svc/postgres-service 5432:5432 &`
            - Or access it via any node's IP at port 30007
        - Create a Table and Insert Data:
            - Connect to your `PostgreSQL` database using a client like `psql` or any database tool that supports `PostgreSQL`:
                - Execute this:

                        CREATE TABLE test (id SERIAL PRIMARY KEY, name VARCHAR(255));
                        INSERT INTO test (name) VALUES ('Hello World');
                
                - Query the data:

                        SELECT * FROM test;

                - Test Persistence:
                    - `kubectl delete pod -l app=postgres`
                    - Kubernetes will automatically recreate the pod using the `PersistentVolumeClaim`
                    - Once the new pod is running, connect again and check the data:

                            SELECT * FROM test;

                    - The data should still be there
    
    + Additional info:
        - `AWS Cluster Role`: https://docs.aws.amazon.com/eks/latest/userguide/service_IAM_role.html
        - `AWS Node Role`: https://docs.aws.amazon.com/eks/latest/userguide/create-node-role.html

- **Tinker, Tailor, Docker, Spy:**
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
    6. Add Prometheus and Grafana with helm:
        - Add the Helm repositories:
            - `helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`
            - `helm repo add grafana https://grafana.github.io/helm-charts`
            - `helm repo update`
        - Install them:
            - `helm upgrade --install prometheus prometheus-community/prometheus --namespace monitoring --create-namespace`
            - `helm upgrade --install grafana grafana/grafana --namespace monitoring --create-namespace`
        - The following steps are also displayed after installing them, but to summarize:
            - Get the password for Grafana login:
                - `kubectl get secret --namespace monitoring grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo`
            - Get the Grafana URL:
                - `export POD_NAME=$(kubectl get pods --namespace monitoring -l "app.kubernetes.io/name=grafana,app.kubernetes.io/instance=grafana" -o jsonpath="{.items[0].metadata.name}")`
                - `kubectl --namespace monitoring port-forward $POD_NAME 3000`
        - Now log into the Grafana interface from the browser:
            - `localhost:3000`
            - username: `admin`
            - password: *what gets generated in a previous step*
    7. HELM-erize the app (at this point we are done, we're just upgrading the solution):
        - Clean-up cluster deployments:
            - `kubectl scale deployment flask-app --replicas=0`
            - `kubectl get deployment` (should be 0 now)
        - Create a folder for the helm charts:
            - `mkdir -p helm/charts`
            - go inside the charts folder and create a new `helm chart`:
                - `helm create flask-app`
            - Now update the files in the template folder with the config file you created earlier for k8s:
                - update the following files:
                    - `Chart.yaml` (just general info)
                    - `values.yaml` (Values should be added here - note image tag is separate! not like in the k8s yaml file)
                    - `templates/deployment.yaml` (cross-check what should be referenced)
                    - `templates/service.yaml` (cross-check what should be referenced)
        - Now that it's set up, we can deploy:
            - `helm install flask-app-with-helm helm/charts/flask-app`
            - `helm upgrade flask-app-with-helm helm/charts/flask-app --install` (if you need to make any changes, eg it didn't work on the first try)
        - Use the 2 commands that get displayed, to get an URL!

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

- `exec` command interequality wiht docker:
    - `kubectl exec -it mongo-pod -- bash -c "mongo"`
    - SAME AS
    - `docker exec -it <CONTAINER_ID> mongo`

## LINKS:
- Full documentation: https://kubernetes.io/docs/home/
- Full Kubernetes commands guide: https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands

- Minikube setup guide: https://minikube.sigs.k8s.io/docs/start/

- `kubectl` commands documentation: https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands
- `eksctl` guide: https://eksctl.io/usage/creating-and-managing-clusters/
- AWS guide to `eksclt`: https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html

- Service accounts: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
- RBAC examples: https://kubernetes.io/docs/reference/access-authn-authz/rbac/

- Volumes summary video: https://www.youtube.com/watch?v=0swOh5C3OVM&ab_channel=TechWorldwithNana
- Volumes: https://kubernetes.io/docs/concepts/storage/volumes/
- Persistent Volumes: https://kubernetes.io/docs/concepts/storage/persistent-volumes/
- Storage Classes: https://kubernetes.io/docs/concepts/storage/storage-classes/
- StatefulSets: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/

- HELM documentation: https://helm.sh/docs/
- HELM intro video: https://www.youtube.com/watch?v=fy8SHvNZGeE&ab_channel=IBMTechnology
- HELM intro video (with Nana): https://www.youtube.com/watch?v=-ykwb1d0DXU&ab_channel=TechWorldwithNana
- HELM source code: https://github.com/helm/helm
- HELM getting started with your own chart: https://helm.sh/docs/chart_template_guide/getting_started/
- HELM vs. kubectl (with HELM workflow!): https://medium.com/@RedBaronDr1/helm-vs-kubectl-5aaf2dba7d71