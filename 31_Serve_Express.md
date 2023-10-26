# Overview WORKSHOP (23.10.25)
- Express is an NPM tool
- JSON file is created:
    - shows info about the project and the dependencies
- What does express do?
    - Express is a popular and minimalist web application framework for Node.js.
    - It provides a set of features and tools for building web and mobile applications, APIs, and other server-side applications.

- **Process:**

    1. `npm init`            // Create JSON file (keep clicking ENTER)
    2. add `"type": "module"` to package.json file ("module" means modern JS (ES6 syntax), "common.js" means classic JS (before ES6))
        // alternatively name files *.mjs -> this means modulJavaScript, it will use "modul" as default
    3. `"scripts"` in package.json:
        add `"start": "node index.js"` -> you can do `"npm start"` instead of `"node index.js"`
        you need to a name from the list (Ctrl + SPACE to see the list inside "")
    4. `npm i express` -> adds express to package.json dependencies
            Creates also node_modules folder (exclude in .gitignore!)
        (`npm i` by default downloads and installs all **dependencies** and **devdependencies** inside the pakcage.json file)
        
    5. `npm i --save-d nodemon` Now we can start with nodemon instead of node

    6. **index.js** file:
    
            import express from "express";
            import fs from "fs";
            const app = express();

            app.use(express.json()); // express won't parse body, so we need an express middleware
            app.use(express.text()); // we can add other formats too 

            app.get("/getAllData", (req, res) => {          //req -> the client sent it; res -> what we are sending
                fs.readFile("./data/data/json", "utf-8", (err, data) => {
                    if (err){ 
                        return res.json({message: "Error occured!"})
                    }
                    return res.json(JSON.parse(data));  // json response is specified to be sent
                    return res.send(JSON.parse(data));  // no format is specified, tries to guess
                })
                res.send("Hello");
            })

            app.get("/SpecificDataById/:id/:name", (req, res) => { //flexible endpoint, where we can add a parameter in the URL
                console.log(req.params.id);
                console.log(req.params.name);
                try{
                    fs.readFile("./data/data.json", "utf-8", (err, data) => {
                        if (err) return res.status(500).json({message: "Error occured!"});

                        let allData = JSON.pars(data);
                        let requestedData = addData.find(nextData => nextData.id == req.params.id)

                        if(!requestedData) return res.status(404),json({message: "Data not found!"})
                        
                        res.json(requestedData);
                    })
                } catch (error){
                    console.log(error);
                    return res.status(500).json({message: "Error occured!"});
                }

            });

            app.post("/registerNewPerson", (req, res) => {
                try{
                    fs.readFile("./data/data.json", "utf-8", (err, data) => {
                        if (err) return res.status(500).json({message: "Error occured!"});

                        let allData = JSON.pars(data);
                        let name = req.body.name;
                        
                        if (typeof req.body.name !== "string"){return res.status(406).json({message: "Error occured!"})};

                        allData.push({ id: allData.length, name: req.body.name });

                        fs.writeFile("./data/data/json", JSON.stringify(allData), (err) => {
                            if (err) return res.status(500).json({message: "Error occured!"});
                            res.status(201).json({message: "Success!"});
                        })
                    })
                } catch (err){

                }
            })

            app.listen(3000, () => {
                console.log("the app is running on port 3000");     //The port needs to be opened to the real world (another topic), to make it a real server (DNS server is the dictionary that translates domain names into ip addresses)
            })
    
# Serve (=responding to GET requests)
- The opposite of downloading -> serving = providing/uploading data using a web server (Express.js JS library)
- Very important not to mix Frontend (client) and Backend (server) code, they should go in separate folders
- Preparation:
    1. Create new repo on GitHub with Node template for gitignore
    2. Create an index.js file (don't forget to step into the filder first!)
    3. Run `npm init` command in Terminal (in the root folder) - keep hitting Enter to go along with the default values for the package.json file
    4. We can now install express: `npm install express` -> new files are created in the repo 
- **NPM:**
    - **Node Package Manager:** 
        - command-line tool and a repository of loads of packages for Node.js
        - server-side JS runtime environment
        - allows developers to install and manage external dependencies in their Node.js projects
        - social hub (npm.js) -> similar like git and GitHub, offers loads of packages to discover
- Install `nodemon` not to stop and start the server every time:
    - npm install -g nodemon -> to install once!
    - nodemon index.js -> to start

## Request:
- How to accept request with Express.js:

    - **Import Express:**
        - old way with `require()`:

                const express = require('express');
                const app = express();

        - new way (standardized ECMAScript version):

                import express from "express";
                const app = express();

                Don't forget to add >"type": "module"< to the package.json file!

    - **Accept get request:**
        - Add this to the index.js file:

                app.get('/', (req, res) => {        // '/' refers to root
                    res.send('Ciao');
                });

                app.listen(3000, () => {
                    console.log(`Open this link in your browser: http://127.0.0.1:3000`);
                })

        - Another path for a different request:

                app.get('/another-path', (req, res) => {
                    res.send('Ciao on another path!');
                })

        - start server with `node index.js` command -> clickable link with server's address should appear

        - **Code breakdown:**
            - The first line imports the express module.
            - The second line creates an instance of the express application and assigns it to a constant variable app.
            - Then, we define a route for the application using the app.get() method.
            - In this case, the route is for the root URL ('/'). When the user navigates to this URL in their web browser, the callback function defined by (req, res) => { } is executed.
            - This function takes two arguments: req (short for "request") and res (short for "response"). The req object represents the HTTP request sent by the user's browser, and the res object represents the response that will be sent back to the browser.
            - The res.send() method sends the string "Ciao" as the response to the browser.
            - Finally, we use the app.listen() method to start the application and listen for incoming HTTP requests on port 3000.
            - The callback function specified as the second argument is executed once the server is up and running. It logs a message to the console with a link that can be used to access the web application in the browser.

    - **Read query strings:**
        - Extend the request handler to read the query strings from the request object:

                app.get('/', (req, res) => {
                    const q = req.query;    //the variable is name=David, "q" will be an object, in which we store "David" value under "name" key!
                    console.log(q);
                    res.send('Ciao');
                });

                // The site should now be opened with an additional query string: http://127.0.0.1:3000/?name=David (NOT q=David!!!)

        - All the query strings are represented as an object's key pairs and you can access them with dot notation:

                app.get('/', (req, res) => {
                    const q = req.query;
                    res.send(`Ciao, ${q.name}!`);
                });
    
    - **Read the path:**
        - Add a new `get` request handler:

                app.get('/users/:userId', (req, res) => {
                    res.send(`The user id is: ${req.params.userId}`);       // "The user id is: 1" will be displayed after opening "http://127.0.0.1:3000/users/1"
                });
                
        - `req.params` is also an object like `req.query`, and **userId** became the key's name in this object, and the value is what we wrote in the browser instead of **:userId** (=1). 

## Response:
- We can do operations with the **query parameters** (`req.query`) and the **path parameters** (`req.params`), before sending them back, for example:

        app.get('/math/:op', (req, res) => {            // The first line sets up the GET route for /math/:op, where :op is a placeholder for the operation name. For example, if the URL is /math/add, the op parameter will be "add".

            const x = parseFloat(req.query.x);          // "x" and "y" parameters are extracted from the query and stored in own scope
            const y = parseFloat(req.query.y);

            const {op} = req.params;                    // using destructuring, we get the value of the "op" parameter (req.params would be { op: "add"} for example, and we extract the "op" key as a constant, and we store the value "add")

            const result = op === "add" ? x + y : op === "subtract" ? x - y : op === "multiply" ? x * y : op === "divide" ? x / y : false;      // Using ternary operator, we describe the value, or false if the operation is not recognized

            const resultObject = {                      // This is where we convert the result into a JSON object
                numbers: {
                    x: x,
                    y: y
                },
                operation: op,
                result: result ? result : `Unrecognizable operation name`
            }

            res.send(result);

        });

        // This is how we expect the URL to be called:
        http://127.0.0.1:3000/math/divide?x=10&y=2

## Serving data from JSON file:
- Import both `express` and `fs`:

        import express from "express";
        import fs from "fs/promises";

        const app = express();

- Create first endpoint to list all users from users.json file using fs package:

        app.get('/users', async (req, res) => {
            const data = await fs.readFile('./users.json', 'utf8');
            const users = JSON.parse(data).users;
            return res.send(users);
        });

- Create second endpoint to find user IDs (extension of the one before, but the previous one is also being kept!):

        app.get('/users/:userId', async (req, res) => {
            const data = await fs.readFile('./users.json', 'utf8');         // The fs.readFile method is used to read the user data from the users.json file. The utf8 encoding option is passed to ensure that the file is read as a string.
            const {users} = JSON.parse(data);                               // Parsed into a JavaScript object using JSON.parse, and then the users array is extracted
            const userId = parseInt(req.params.userId);
            const user = users.find(user => user.id === userId);
            if (user) {
                return res.send(user);
            } else {
                return res.status(404).send({state: 'User not found'});  // Returns 404 error message
            }
        });

        // Now if we open the the following URL, we get the user 1 object:
        http://localhost:3000/users/1

        // This code creates an Express.js web server with two endpoints: /users and /users/:userId.
        // The first endpoint serves all users data, and the second endpoint serves data for a specific user based on their user ID.

## Serving files other than JSON / Client files:
- In our current server, visitors cannot access the users.json or index.js file directly. 
- This is also true if you host the web server on a VPS (virtual private server), which is good because we need to protect these files on our web server.

- To limit the publicly available files when serving files, we can create a **client folder** and an `index.html` file to serve:
    - This file will be the main page served when a user visits your website.

- Inside **client folder** create a new folder called **public**
    - This folder will contain all the publicly available files such as CSS, JavaScript, images, etc. that will be used by your website.

- Import the path package and the fileURLToPath method from the url package by adding the following code after the fs import:

        import path from "path";
        import { fileURLToPath } from 'url';

        // And also create 2 global variables:

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

- Add the following endpoints ABOVE the users endpoints:

        app.use('/pub', express.static(path.join(__dirname, 'client', 'public')));      // the use method creates an endpoint for the static file serving

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'client', 'index.html'));
        });
        
        // The code does the following:
        We use the use method with two arguments to serve the static files from the public directory.
            - The first argument is also an endpoint ('/pub').
            - The second argument is the express.static method. This method takes the absolute path of the directory as an argument.
        We define a route for the root URL (/) and send the index.html file using the res.sendFile method. This method also takes the absolute path of the file as an argument.
        The file paths are defined using the path.join method, which takes the directory name and the file name as arguments and returns the absolute path of the file. We use the __dirname variable to get the absolute path of the current directory.

- Add basic HTML structure (short way is by typing "!", then clicking on the first option on autocomplete):

        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">       // This line was also added, but no explanation
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <script src="/pub/script.js"></script>                      // Add this line
            </head>
            <body>
                <div id="root"></div>                                       // Add some content
            </body>
        </html>

- Also create the script.js file inside the public folder with a basic console.log("loaded succefully!") message
- Now running nodemon index.js and opening the link, we should se index.html's content displayed
- **Our script file is in the public folder of the client folder in our repository, but for the "outside world" (for the browser) it's available across the /pub endpoint**

## Serve and Fetch
- Now that we have an index.html, a script.js and an API endpoint, we can add more code to our script.js file to render our API's data into some HTML:

        const url = 'http://127.0.0.1:3000/users';                          // specifies the URL of our API endpoint that returns JSON format

        const userHTML = user => `<div class="user"><span class="user-id">${user.id}</span> ${user.name}</div>`;
        const usersHTML = users => `<div id="users">${users.map(user => userHTML(user)).join("")}</div>`;

        const fetchData = async (url) => {                                  // async added, because we are fetching using await (url constant created in the beginning is used here!)
            try {
                const response = await fetch(url);
                return await response.json();
            } catch (error) {
                console.error(error);
            }
        };

        const main = async _ => {                                           // async added, because we are fetching inside using await
            const root = document.getElementById("root");                   // main() is now the loadevent(), and we access "root" element from here (the script is in the HEAD of the HTML!)
            const users = await fetchData(url);                             // fetching using await
            root.insertAdjacentHTML("beforeend", usersHTML(users));         // usersHTML() function called to create HTML content with the fetched users content
        };

        window.addEventListener("load", main);