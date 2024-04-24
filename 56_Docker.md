# DOCKER

## TUTORIALS
- CHEATSHEET: https://devhints.io/docker

- https://training.play-with-docker.com/beginner-linux/
- https://training.play-with-docker.com/docker-volumes/
- https://training.play-with-docker.com/
- https://training.play-with-docker.com/alacart/
- https://training.play-with-docker.com/ops-s1-images/

## DOCKER BASICS
- **Basics:**
    - Docker is a tool that allows developers to easily deploy their applications in "sandbox" like environments (called containers) to run on the host operating system i.e. Linux.
    - The main advantage of Docker is that it allows to package an application with all of its dependencies into a standardized unit for software development
- **How it works:**
    - The `docker file` is a short file on your machine, that is used to build a `docker image` on the virtual machine
    - The `docker image` then runs one or more `containers` also on the VM
    - The `docker image` becomes the project code -> You can push it to `Docker Hub` or `Quay.io` (similar to github)
    - The pushed `docker image` can then be used to run a container on other machines, without installing any of the projects dependencies
- **Docker image:**
    - a collection of instructions used to create a container
    - readymade templates of services like PostgreSQL, Nginx, etc.
    - You can create your own images with Dockerfiles or use existing ones available at Docker Hub
- **Container:**
    - a standard unit of software that bundles code and all its dependencies so that applications could be run fast and reliably between different computing environments
    - allows applications to run in complete isolation from each other while allowing them to use the same system resources and the same operating system
- **Containerization (Docker container) vs Virtualization (VM):**
    - **Virtualization:**
        - Virtualization is the technology which can simulate your hardware (such as CPU , disk, memory) and represent it as seperate machine
        - a full guest OS gets created, and everything that comes with it  (kernel images, device drivers, etc.). It's called `hardware-level or paravirtualization`
        - uses a hypervisor
    - **Containerization:** 
        - OS-level virtualization (the guest OS layer is removed)
        - It is a kernel feature of a host operating system (a "kernel" being the core part of an OS)
        - generally you need to run a container that uses the same OS as your own machine
        - makes a process/app think it runs in a completely virtualized environment
        - programs running inside of a container can only see what was allocated for the container when it started
        - uses a docker engine instead of a hypervisor<br>
    - **Comparison image:** 
        ![docker v virtual](assets/dockervsvirtual.png)
- **Data storage in Docker:**
    - On a Linux system, Docker stores data like images, containers, volumes, etc under `/var/lib/docker`
    - Data in a container is only available while the container exists
    - Containers are meant to be disposable (specially if you run it with the `--rm` flag, which auto-disposes it)
    - There are 2 options for keeping the files after removing a container:
        - **Volumes:**
            - stored in a part of the host filesystem which is managed by Docker (`/var/lib/docker/volumes/` on Linux). 
            - Non-Docker processes should not modify this part of the filesystem. Volumes are the best way to persist data in Docker
            - Use cases:
                - Sharing data among multiple running containers
                - store your container's data on a remote host or a cloud provider, rather than locally
                - back up, restore, or migrate data from one Docker host to another
                - When your application requires high-performance I/O on Docker Desktop
                - When your application requires fully native file system behavior on Docker Desktop
        - **Bind mounts:**
            - can be stored anywhere on the host OS
            - Non-Docker processes on the Docker host or a Docker container can modify them at any time.
            - Use cases:
                - Sharing configuration files from the host machine to containers
                - Sharing source code or build artifacts between a development environment on the Docker host and a container

- **Docker build:**
    - Build is the process of creating a `docker image` using a `Dockerfile`
    - 2 ways of creating a a `docker image`:
        - `docker commit` an existing container's state to an image
        - write a `Dockerfile` and use `docker build` to create an image (we will be using this!)
    - `Dockerfile`:
        - a text file that contains all the commands that'll be used by `Docker` to assemble an `image`
    - Docker images are immutable, so when there is a change needed, we build a new build a new image
        - When we update the app and create a new image, the previous one becomes untagged `<none>` (you can still use it with it's ID)
    - Typical build-up:
        - `FROM`:
            - `FROM <image>[:<tag>]`
        - `RUN`, eg:
                RUN apt-get update
                RUN apt-get install -y nginx
                RUN chmod +x /some/path/to/script.sh
        - `ENV`: use this to bake environment variables into the environment Docker creates within a container, eg:
            - `ENV <key>=<value>`
        - `ADD` and `COPY`:
            -  use these commands to add arbitrary files to your images, they are basically the same the main difference being is that with `ADD` you can specify a URL (that points to some file) as the source (`COPY` doesn't support this - it's generally better use `COPY` whenever you can)
        - `WORKDIR`, eg:
            - `WORKDIR /path/to/workdir`

- **Docker Compose:**
    - Typically we run 1 app per container. If we want to run more apps, we can use `docker compose` (a tool for defining and running multi-container Docker applications)
    - **How it works:** use a `YAML` file to configure your application's services. Then, with a single command, you create and start all the services from your configuration
    - `docker-compose` command-line tool is not included by default in Docker, so needs to be installed:
        - Basic way: (this won't necessarily install the latest version!)
            - `sudo apt-get update`
            - `sudo apt-get install docker-compose`
        - Advanced way: (safer!)
            - `sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
            - `sudo chmod +x /usr/local/bin/docker-compose`
    - A typical `yaml` file looks like this:

            version: '3.3'

            services:
                db:
                    image: mysql:5.7
                    volumes:
                        - db_data:/var/lib/mysql
                    restart: always
                    environment:
                        MYSQL_ROOT_PASSWORD: somewordpress
                        MYSQL_DATABASE: wordpress
                        MYSQL_USER: wordpress
                        MYSQL_PASSWORD: wordpress
                wordpress:
                    depends_on:
                        - db
                    image: wordpress:latest
                    ports:
                        - "8000:80"
                    restart: always
                    environment:
                        WORDPRESS_DB_HOST: db:3306
                        WORDPRESS_DB_USER: wordpress
                        WORDPRESS_DB_PASSWORD: wordpress
                        WORDPRESS_DB_NAME: wordpress
            volumes:
                db_data:
    

## DOCKER COMMANDS
- Basics:
    - `docker run <image>`: creates a new container from an image, and then start that container
    - `docker start <name|id>`: starts an existing container that is not running
    - `docker stop <name|id>`: 
    - `docker exec`: execute commands within a container without stepping into it
    - `docker ps [-a include stopped containers]`: returns a list of all running containers
    - `docker rm [-f] <name|id>`: remove a container by id (use `-f` force flag if it's still running)
    - `docker login`
    - `docker images`: list available docker images
    - `docker rmi <ID/name>`: remove the image also 
    - `exit`: exit and stop from a container's environment
    - `docker system prune -af`: clear Docker cache
    - `docker logs -t <ID>`
    - `docker exec -it <ID> /bon/bash`: step into a running container with a terminal

    - Upload an image to AWS ECR: ( https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html )
        - `aws ecr get-login-password --region <REGION> | docker login --username AWS --password-stdin <ECR_URL>`

- Pull & run images:
    - `docker pull ubuntu:18.04` (not necessary, as Docker will download it before running it, if you use `run`)
    - `docker run`:
        - the `--rm` flag tells Docker to delete the container after it stops
        - the `-d` flag starts the container in the background and makes Docker display the container's ID
        - the `-i` flag tells Docker to keep open stdin open, combined with `-t` you can interact with containers interactively (e.g. starting a Bash shell inside a container)
        - eg. you can type `sudo docker run -i -t ubuntu:18.04` (type `exit` to exit from the container, this will also stop it!)
    - `docker exec -it <ID> ls -la /`
        - Run exec to execute arbitrary commands inside a running container, without opening it (from outside, in another terminal!)
        - `i` for interactive
        - `t` for terminal (eg `docker exec -it <ID> bash`)
        - `<ID>` can be just the first few letters, if it will already uniquely identify the container (use `docker ps` to see the running processes)
    - `docker ps -a` shows all stopped containers, which you can delete with `docker rm <ID>`

## GUIDES:
- **Install Docker on ubuntu:**
    - `curl -fsSL https://get.docker.com | sudo sh` 
    - if this doesn't work, follow this guide: https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository

- **Build an image:**
    1. Create a Dockerfile
    2. `docker build -t welcome-to-docker .` (in the project folder!)
        - `t` means add a name (`welcome-to-docker`)
        - `.` means the location of the `Dockerfile`
    3. Once the build is done, an image will appear in Docker Desktop
        - Click on it, then `Run`
        - Specify port, eg `8089`
        - Open it in the browser with `http://localhost:8089/` (or click on the `8089:3000` link below)

- **Create and manage volumes:**
    - https://docs.docker.com/storage/volumes/#create-and-manage-volumes

- **Starting a container with a volume:**
    - https://docs.docker.com/storage/volumes/#start-a-container-with-a-volume

- **Starting a container with a bind mount:**
    - https://docs.docker.com/storage/bind-mounts/#start-a-container-with-a-bind-mount

- **Run a MongoDB server and CLI using docker:**
    1. Pull th MongoDB image:
        - `docker pull mongo:latest`   // ALTERNATIVELY `docker pull mongo:4.4`
    2. Start a MongoDB Container:
        - `docker run --name my-mongo -d -p 27017:27017 mongo`: // ALTERNATIVELY `docker run --name my-mongo -d -p 27017:27017 mongo:4.4`
            - `--name my-mongo`: Assigns the container a name "my-mongo"
            - `-d`: Runs the container in detached mode (in the background)
            - `-p 27017:27017`: Maps port 27017 of the container to port 27017 on your host, allowing you to connect to the MongoDB server from your local machine
    3. Unpause the container (not needed generally!):
        - `docker unpause my-mongo`
    4. Access the MongoDB Server using the Mongo CLI:
        - `docker exec -it my-mongo mongo`: // ALTERNATIVELY `docker exec -it my-mongo bash` then `mongo`
            - `docker exec`: Executes a command in a running container
            - `-it`: Connects the terminal input/output with the container, enabling interaction
            - `my-mongo`: Specifies the container where the command should be run
            - `mongo`: The command to run inside the container, which starts the MongoDB shell
    5. Then you can:
        - `show dbs`
        - `use myDatabase`
        - `db.myCollection.insert({name: "John", age: 30})`
        - `db.myCollection.find({})`

- **Using docker build to create an image:**
    1. `git clone https://github.com/docker/getting-started.git` in your WSL
        - The repo's files make up an application we'll be running inside a Docker container by the end of this
    2. Create a file named `Dockerfile` in the same folder (`./gettin-started/app/`) as the file `package.json`: 
        - `nano Dockerfile`
        - with the following contents:

                FROM node:18-alpine
                WORKDIR /app
                COPY . .
                RUN yarn install --production
                CMD ["node", "src/index.js"]

                # EXPLANATION:
                    # Use a more recent version of Node.js that is still in Long Term Support (LTS)
                        FROM node:18-alpine
                    # Set the working directory inside the container
                        WORKDIR /app
                    # Copy package.json and package-lock.json (or yarn.lock) first to leverage Docker cache
                        COPY package.json yarn.lock ./
                    # Install dependencies
                        RUN yarn install --frozen-lockfile --production
                    # Copy the rest of your application code
                        COPY . .
                    # Set the command to run your app
                        CMD ["node", "src/index.js"]

    3. Build the image using this command:
        - `docker build -t getting-started .`
            - `-t` flag tags our image "getting-started"
            - `.` at the end tells that Docker should look for the `Dockerfile` in the current directory
    
    4. Run the app:
        - `docker run -dp 3000:3000 getting-started`
            - `-d` and `-p` flags we tell Docker to run the new container in "detached" mode (in the background) and create a mapping between the **host's** port `3000` to the **container's** port `3000`.
            - Without the port mapping, we wouldn't be able to access the application

- **Using docker compose to launch 2 containers:**
    1. Scaffolding:
        - Create a dir and step into it:
            - `mkdir compose-demo`
            - `cd compose-demo`
        - Create a file called `docker-compose.yml` with the following contents:

                version: '3.3'

                services:
                    db:
                        image: mysql:5.7
                        volumes:
                            - db_data:/var/lib/mysql
                        restart: always
                        environment:
                            MYSQL_ROOT_PASSWORD: somewordpress
                            MYSQL_DATABASE: wordpress
                            MYSQL_USER: wordpress
                            MYSQL_PASSWORD: wordpress
                    wordpress:
                        depends_on:
                            - db
                        image: wordpress:latest
                        ports:
                            - "8000:80"
                        restart: always
                        environment:
                            WORDPRESS_DB_HOST: db:3306
                            WORDPRESS_DB_USER: wordpress
                            WORDPRESS_DB_PASSWORD: wordpress
                            WORDPRESS_DB_NAME: wordpress
                volumes:
                    db_data:

    2. Start the containers:
        - `docker-compose up -d` (run in detached mode! = in the BG)
            - This will take the instructions above and start `wordpress` and `mysql`

    3. Debugging:
        - we can use similar command as with `docker`, but using `docker-compose` instead, eg:
            - `docker-compose ps -a`
        - Check raw html content:
            - `curl -L localhost:8000`
        - Check actual frontend:
            - `localhost:8000` (this is from `yml` file, where it's set)
        - If one container depends on the other, but it's loading more slowly, you can manually restart that container:
            - `docker restart <cont_name/ID>`
        - To check logs, type:
            - `docker-compose logs`
            - OR `docker-compose logs <cont_name/ID>`
    
    4. Teardown:
        - Stop all containers with: `docker-compose down`

<!-- - **nginx + flask task:** (TO BE SUPERSEDED!)
    - Create folder for your project, eg `mkdir Test`
    - Create a Dockerfile:

            FROM nginx:latest
            RUN apt update && apt install python3 python3-pip -y && pip3 install flask
            WORKDIR /app
            COPY app.py .
            RUN python3 app.py &
            EXPOSE 80 #(This is for flask)

            CMD ["nginx", "-g", "daemon off;"]
    
    - Create an `app.sh` script file:

            #!/bin/bash

            nginx -g 'daemon off;' &

            # Start the Flask app (in BG)
            python3 app.py &

            # Wait for any process to exit:
            wait -n
    
    - An `nginx.conf` file is also needed:

            http {
                server {
                    listen 80;

                    location/ {
                        proxy_pass http://0.0.0.0:5000;
                    }
                }
            }
            events {}

    - createa an `app.py` file with this content:

            #!/usr/bin/python

            import time
            from flask import Flask
            app = Flask(__name__)

            START = time.time()

            def elapsed():
                running = time.time() - START
                minutes, seconds = divmod(running, 60)
                hours, minutes = divmod(minutes, 60)
                return "%d:%02d:%02d" % (hours, minutes, seconds)

            @app.route('/')
            def root():
                return "Hello World (Python)! (up %s)\n" % elapsed()

            if __name__ == "__main__":
                app.run(debug=True, host="0.0.0.0", port=8080)

    - build the image file: `docker build . -t test`
    - run it in the background: `docker run -d -p 8080:80 -p 5001:5000 test`  -->


## LINKS
- Full documentation: https://docs.docker.com/reference/

- Docker with NANA (video, 3hrs!): https://www.youtube.com/watch?v=3c-iBn73dDE&ab_channel=TechWorldwithNana
- Another long Docker basics video: https://www.youtube.com/watch?v=p28piYY_wv8&ab_channel=Amigoscode

- Docker how it works: https://www.youtube.com/watch?v=pGYAg7TMmp0&ab_channel=LearnCode.academy
- Docker intro + Containers https://www.youtube.com/watch?v=xnuXKYsZv2Y&t=262s&ab_channel=Simplilearn

- Volumes: https://docs.docker.com/storage/volumes/
- Bind mounts: https://docs.docker.com/storage/bind-mounts/

- Dockerfile examples: https://docs.docker.com/reference/dockerfile/#dockerfile-examples
- Complete Dockerfile reference (docs): https://docs.docker.com/reference/dockerfile/

