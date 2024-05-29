# DOCKER

- manually start docker daemon: `sudo service docker start`

- **Dockerfile consists of:**
    - `FROM`: Ebből az image-ból indulunk ki
    - `RUN`: Ezeket a parancsokat akarjuk lefuttatni
    - `ENV`: Környezeti változókat tudunk beállítani a konténerben
    - `ADD` and `COPY`: Rámásolni file-okat az image-re (pl ./App). Általában a COPY-t használjuk, az a teljesebb
    - `WORKDIR` A working directory-t állítjuk be vele
    - `CMD`: Az elindításhoz szükséges parancsot és paramétereket tudjuk ezzel meghatározni (módosítható runtime-ban)
    - `ENTRYPOINT:` Az elindításhoz szükséges parancsot és paramétereket tudjuk ezzel meghatározni (nem módosítható, de bővíthetőek a paraméterek)
    - `EXPOSE`: Beállíthatjuk, hogy melyik porton hallgasson a konténerben futó network (de nem ez nyitja ki a portot!)
    - `VOLUME`: Egy mount point-ot hoz létre egy path-al, amire tudunk Volume-ot csatolni

- **Most importan commands:**
    - `docker pull <image>`: Pull an existing container
    - `docker run -d -p 5000:5000 <image>`: Run an existing container (`-d` in the BG, `-p` bind port)
    - `docker build -t 1.0 .` (must be in the same folder as the Dockerfile!)
    - `docker run/create -p 5000:5000 app1Name` (Host `:5000` -> Container (App1) `:5000`)
    - `docker stop <name/ID>`
    - `dokcer kill <ID>`
    - `docker images`
    - `docker exec -it <ID> /bin/bash` / `/bin/sh`: execute commands within a container
    - `docker ps [-a include stopped containers]`: returns a list of all running containers
    - `docker rm [-f] <name|id>`: remove a container by id (use `-f` force flag if it's still running)
    - `docker rmi <ID/name>`: remove the image also 
    - `docker system prune -a`: Delete every image
    - `docker tag <existing-image>:<existing-tag> <new-image>:<new-tag>`: re-tag your image for pushing to DockerHub
    - `docker exec <container_name_or_id> <command>` run a command in the container wihtout stepping into it
        - eg. `docker exec my-container ls`
    
    - `docker network connect <targetNetwork> <fromNetwork>` # also with `disconnect`
    - `docker network ls` # list all networks
    - `docker network inspect <network>` # list containers that use this network
    - `docker inspect <containerName/IS>` # get details of container, including IP to connect

## TYPICAL EXAMPLES (`docker build / docker run`):
- **EXISTING IMAGE - Run a MongoDB server and CLI using docker:**
    1. Pull th MongoDB image:
        - `docker pull mongo:4.4` (not needed, because `run` will download it anyway!)
    2. Start a MongoDB Container:
        - `docker run --name my-mongo -d -p 27017:27017 mongo:4.4`
            - `--name my-mongo`: Assigns the container a name "my-mongo"
            - `-d`: Runs the container in detached mode (in the background)
            - `-p 27017:27017`: Maps port 27017 of the container to port 27017 on your host, allowing you to connect to the MongoDB server from your local machine
    3. Access the MongoDB Server using the Mongo CLI:
        - `docker exec -it my-mongo mongo`: // ALTERNATIVELY `docker exec -it my-mongo bash` then `mongo`
            - `docker exec`: Executes a command in a running container
            - `-it`: Connects the terminal input/output with the container, enabling interaction
            - `my-mongo`: Specifies the container where the command should be run
            - `mongo`: The command to run inside the container, which starts the MongoDB shell
    4. Then you can:
        - `show dbs`
        - `use myDatabase`
        - `db.myCollection.insert({name: "John", age: 30})`
        - `db.myCollection.find({})`

- **BUILD YOUR OWN IMAGE: simple hello world app with node:**
    1. Create project dir and step into it!
    2. Create `app.js` file and `package.json` files into it
    3. Create `Dockerfile` (use file from `/resource files/docker/Dockerfile-node`)
    4. `docker build -t my-node-app .`
    5. `docker run -p 3000:3000 -d my-node-app` (use ports 5000 if it's a python app!)
    6. Open `localhost:3000` in the browser

# DOCKER-COMPOSE
- We use this to have multi-app containers (the apps are services)
- For this, we use a `yaml` file, not the `Dockerfile` that was used in the basic `docker build` examples

## TYPICAL EXAMPLES (`docker-compose`):
- **Using docker compose to launch 2 containers (wordpress + mysql):**
    1. Create a dir and step into it
    2. Create the yaml (use `docker-compose-01.yaml` file's content)
    3. `docker-compose up -d`
    4.  - Check raw html content: `curl -L localhost:8000`
        - Check in browser: `localhost:8000`
    5. `docker-compose down` (must go back to the same folder!)

    - Debugging:
        - `docker-compose ps -a`
        - `docker-compose logs`
        - `docker restart <container>` restart a container if depends on another (but this should be added in the yaml file!)

- **Docker networking - `flask`/`nginx` task (PART I - Creating the image with docker compose):**
    - This is a combined solution, where we create our app's container first with a `Dockerfile`, then use `docker-compose` to combine it with an `nginx` image
    
    1. Create a dir and step into it (don't use `app` as the folder name!)
    2. Create a flask app (use the `app.py` and the `requirements.txt` files in the flask app folder - but only add `Flask==3.0.3` to the requirements file!)
    3. Create a `Dockerfile` (use `Dockerfile-nginx-flask` file)
    4. Create the `docker-compose.yaml` file (use `docker-compose-02.yaml`)
    5. Create an `nginx.conf` file (use `nginx.conf` file in the docker folder)
    6. Build and run containers:
        - `docker-compose up --build` (build is also needed here!)

- **Example for the brief: App + Nginx + DB (postgres):** *****************************************
    1. Create a dir and step into it (don't use `app` as the folder name!)
    2. Create a flask app (use the `app.py` and the `requirements.txt` files in the flask app folder - but only add `Flask==3.0.3` to the requirements file!)
    3. Create a `Dockerfile` (use `Dockerfile-nginx-flask` file)
    4. Create the `docker-compose.yaml` file (use `docker-compose-07-app+nginx+db.yaml`)
    5. Create an `nginx.conf` file (use `nginx.conf` file in the docker folder)
    6. Build and run containers:
        - `docker-compose up --build` (build is also needed here!)

- **Create separate networks for 2 public & 2 private networks:**
    - Use the `docker-compose-06_NETWORKING.yml` file to create your services and networks
        - `docker-compose up`
    - Now we can check connections with ping:
        - on networks created by User, we can `ping by name`
        - on default networks, we can't `ping` by name, just with the `container's IP`

# PUSHING IMAGES TO A HUB:
- **Push image to DockerHub:**
    1. `docker login` (enter email and PW)
    2. `docker tag <appNameCreated>:latest gakalmar/<appNameYouWant>:1.0` (don't forget to add the username!)
    3. `docker push gakalmar/<appName>:1.0`

- **Add image to ECR:**
    - Create a private repo on AWS (=docker registry):
        - look for ECR service on AWS -> Get Started
        - add name -> create repository
        - on AWS you create a Docker repo PER IMAGE! But different versions can go in the same repo!

    - Click on the repo -> `View push commands` (follow the commands listed!):
        - (assuming it was built already locally)
        - you have to log in into the private repo:
            - `aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 891376988072.dkr.ecr.eu-west-2.amazonaws.com`
                - this needs `aws CLI` installed
                - AWS credentials configured
            - this command uses `docker login` in the background
        - create a copy of the image in the AWS format (modify the AWS code with version and name!):
            - `docker tag nginxflask_app:1.0 891376988072.dkr.ecr.eu-west-2.amazonaws.com/test-flask-nginx:1.0`
                - the first name is the name of the image as you called it
                - modify `:latest` to the tag you want, eg. `1.0`
        - you can check with `docker images` if it was really created
        - now you can push to AWS:
            - `docker push 891376988072.dkr.ecr.eu-west-2.amazonaws.com/test-flask-nginx:1.0`

# VOLUMES
- **Bind mount vs Volume:**
    - `Bind mount` is a specific path on the host machine. Useful when we want to access something on the host machine
    - `Volume` is a separate/decoupled entity from the host, that's easier to manage and share between containers

- **Working with volumes with docker-compose:**
    - Adding a volume using a `yaml` file (example in `docker-compose-03_VOLUMES.yml` file)
    - Adding a bind mount using a `yaml` file (example in `docker-compose-04_BINDMOUNT.yml` file)

- **Working with volumes manually:**
    - **Create and manage volumes:**
        - Create a volume outside a scope of a container:
            - `docker volume create my-vol` 
                - check with `docker volume ls` to see all
                - use `docker volume inspect my-vol` to check parameters
                - Remove it with `docker volume rm my-vol`

    - **Starting a container with a volume:**
        - We don't have to create it, because docker creates it for us if it doesn't exist yet
        - Mount the named volume `myvol2` into `/app/` in the `nginx` container:
            - `docker run -d --name devtest --mount source=myvol2,target=/app nginx:latest`
            - `docker inspect devtest` (check under "Mounts" if it was attached correctly)
        - Teardown (volume removed separately!):
            - `docker container stop devtest`
            - `docker container rm devtest`
            - `docker volume rm myvol2`
    
    - **Starting a container with a bind mount:**
        - Bind mount uses a path (`./dbdata`) that specifies a directory on the host machine directly!
        - Mount the volume manually:
            - Create the directory you want to use first (eg. `mkdir target`)
            - `docker run -d -it --name devtest2 --mount type=bind,source="$(pwd)"/target,target=/app nginx:latest`
            - `docker inspect devtest` (check under "Mounts" if it was attached correctly)
        - Teardown (volume removed separately!):
            - `docker container stop devtest2`
            - `docker container rm devtest2`
            - `docker volume rm myvol2`