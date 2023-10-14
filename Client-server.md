# Client-Server Communication / Fetch
- Communiation between:
    - **Client** (eg. **web browser**)
    - **Server** (eg. computer hosting a website or web application = **web server**)
- **Server:**
    - **VPS** (*=Virtual Private Server*) - computer connected to the internet
    - **Web server** - programs that run on any computer (but mostly on a VPS)
- Steps in communication:
    1. Browser sends a request to the server using a protocol called **HTTP** (*=Hypertext Transfer Protocol*):
        - information such as theURL of the file or any additional parameters are included
    2. Server receives the request and processes it, to check if it's valid and if the file exists
    3. If all checks are done and in order:
        - Server sends the file back  in chunks, using protocol **TCP** (*=Transmition Control Protocol*)
    4. Browser receives the file in small chuncks and assembles them into the file, then saves it to the computer

## Network
- **Request - Response:**
    - An HTTP **request** is sent by the *client to the server*, requesting a resource such as a web page, image, or file.
    - An HTTP **response** is sent by the *server to the client*, containing the requested resource or an error message.
    - **request/response message:** contains a `header` and a `body`:
        - **Header content:**
            - the **method** of the request (such as `GET`, `POST`, `PUT`, `DELETE`)
            - the **URL** of the requested resource
            - any additional headers or parameters, such as *cookies* or aut*hentication information*
        - **Body content:**
            - the requested resource (*web page, image, file or error message*)
    - Client vs Server side:
        - **Client side** code runs in the browser (handles user's interactions)
        - **Server side** code runs on the web server (is responsible for handling requests from the browser, processing data/databases and create dynamic content)
- **Network panel:**
    - Under *Network* tab in browser's *Developer Tools*
    - Monitors network activity of a webpage (all requests and associated responses)
    - Displays these in a timeline (of activities), and indicates **how long these take** (in millisecs), the **format/type** and HTTP **status** returned by the server
    - Track **errors** and **redirects**
    - By **selecting an activity**, we can check the details under the *Header* tab, the *Response Headers*, and under the *Response* tab we can see the responses sent
    - **Filter activities:** eg. by *resource type* (such as images, scripts, or XHR requests), *status code* (such as 200 OK or 404 Not Found)

## URL
1. **Scheme/Protocol:**
    - The first part of the URL, that specifies the protocol used:
        - **HTTP** / **HTTPS** (*=HyperText Transfer Protocol Secure*) are the most common
        - used for accessing web pages iver the internet (`http://` or `https://`)
        - other common schemes are:
            - **FTP** (File Transfer Protocol)
            - **SMTP** (Simple Mail Transfer Protocol)
            - **SSH** (Secure Shell)
2. **Domain Name:**
    - The second part of a URL, that specifies the domain name of the website or web server hosting the resource
    - The domain name is often preceded by `www.` and followed by a **top-level domain (TLD)** like `.com`.
    - In simple terms, the domain names are **covers** for an IP address. (eg. `http://www.example.com`)
    - **IP address and Ports:**
        - IP address is eg. `http://127.0.0.1:9000`:
            - this is also a URL!
            - consist of:
                - protocol (`http://`)
                - IP address (`127.0.0.1`)
                - **port number** (`9000`)
                    - `:80` for *HTTP* and `:443` for *HTTPS* are default preserved ports for HTTP communication
                    - when a request arrives at a server, it automatically uses these ports to process requests (that's why we don't have to specify them)
                    - when we run a **web server** on **our comupter** we use another port (eg. `9000`), and that's why we specify it then
3. **Path:**
    - The third part of a URL, that specifies the path to the specific resource on the web server.
    - Contains one ore more directory names separated with `/` (eg. `https://www.example.com/blog/post.html`)
4. **Query string:**
    - optional part of a URL
    - allows parameters to be passed to the server with the request
    - separated from the path by a `?` question mark: 
        - eg. `https://www.example.com/search?q=example&sort=asc` passes two parameters to the server: 
            - *q* with a value of *example*
            - *sort* with a value of *asc*
5. **Fragment identifier:**
    - optional part of a URL
    - allows specific sections of a web page to be linked to directly
    - separated from the path by a `#` hash symbol, referring to an HTML element with a matching ID
        - eg. `https://www.example.com/about#team`:
            - scroll the user's browser to the section of the "about" page with an element with the **ID** `team`

## **Fetch:**
- Old way:
    - web pages were actual HTML pages with minimal JS
    - the HTML was downloaded, then the communication with the server ended
- Nowadays:
    - HTML has a smaller role
    - JS downloads data from time to time and renders it into HTML
    - **New Web Server type** appeared *optimized for serving data only*, mostly in **JSON** format

- **Rest API servers:**
    - **API** *=Application Programming Interface*
        - a set of rules an protocols that allows communication
    - **Rest API**: *=Representational State Transfer API*
        - a type of web API that follows a set of architectural principles and constraints
        - an architectural style that defines a set of guidelines for creating web services that are scalable, maintainable, and reliable
        - REST APIs are designed to be *platform-independent* (they can be accessed from any device or programming language that can make HTTP requests)
        - Provide a set of endpoints (eg. URLs) that can be accessed using HTTP methods:
            - eg. provide endpoints for retrieving user profiles, posting status updates, and uploading photos:
                - `https://example.com/users/{user_id}`
                - `https://example.com/posts`
- **Downloading Data:**
    - interact with APIs to retrieve or send data to a server
    - Older API is *XMLHttpRequest (XHR)*
    - **Fetch API** is a newer tool built into modern web browsers that allow developers to **make HTTP requests** and **handle responses**:

        - Making a simple `GET` request to retrieve some *JSON data*:

                function fetchData(url){
                    fetch(url)
                        .then(response => response.json())
                        .then(data => console.log(data));           //NOTE these are "inline dot notations", hence the missing ";"!
                }

                fetchData('https://jsonplaceholder.typicode.com/todos/1');

                // Code breakdown:
                1. fetch() function is used to send a GET request to the URL https://jsonplaceholder.typicode.com/todos/1
                2. then() method is used to handle the response, converting it to JSON using the json() method
                3. then logging the resulting data to the console

        - To improve this, we can add a `catch()` block to handle any errors:

                function fetchData(url){
                    fetch(url)
                        .then(response => response.json())
                        .then(data => console.log(data))
                        .catch(error => console.error(error));      //THIS LINE WAS ADDED
                }

                fetchData('https://jsonplaceholder.typicode.com/todos/1');
        
        - Using **async/await** syntax with **Fetch API**:
            - provides a cleaner and more intuitive way to handle **asynchronous** code
            - declare our function as **async** and use the `await` keyword to wait for the response to be returned:

                    async function fetchData(url) {
                        try {
                            const response = await fetch(url);
                            const data = await response.json();
                            console.log(data);
                        } catch (error) {
                            console.error(error);
                        }
                    }

                    fetchData('https://jsonplaceholder.typicode.com/todos/1');

                    // Code breakdown:
                    1. define an async function called fetchData() that uses the await keyword to wait for the response to be returned from the server
                    2. try/catch block added to handle any errors that may occur during the request

- **Updating the DOM:**
    - After the JSON data is downloaded, we can work with it and update the DOM with it
    - There are many different ways, but we will go through the closer method to how **React** works:
        
        - *Example 1:*

                const userList = document.getElementById('user-list'); //if element with this ID exists in the index.html file!
                const userHTML = user => `<div>${user.name} - ${user.email}</div>`;
                const url = 'https://jsonplaceholder.typicode.com/users';

                fetch(url)
                    .then(response => response.json())
                    .then(users => {
                            let usersHTML = "";

                            for (const user of users){
                                usersHTML += userHTML(user);
                            }
                            userList.insertAdjacentHTML("beforeend", usersHTML);
                    })
                    .catch(error => console.error(error));

        - *Example 2:* (closer to **React**!)

                const userList = document.getElementById('user-list');
                const userHTML = user => `<div>${user.name} - ${user.email}</div>`;
                const url = 'https://jsonplaceholder.typicode.com/users';

                const fetchData = async(url) => {
                    try{
                        const response = await fetch(url);
                        const users = await response.json();

                        const usersHTML = users.map(user => userHTML(user)).join(""); // you need the join with an empty string because map returns with an array!

                        userList.insertAdjacentHTML("beforeend", usersHTML);
                    } catch (error) {
                        console.error(error);
                    }
                }

                fetchData(url);

                // Code breakdown:
                1. The fetchData function is defined as an asynchronous function that takes a URL argument
                2. Inside the try block of the fetchData function, the fetch function is used to make a GET request to the specified URL.
                3. The response.json() method is called to convert the response to a JSON object (in this case, it's an array)
                4. The users array is then mapped to create an array of HTML strings using the userHTML function
                    (the resulting array is joined with an empty string to create a single string of HTML code)
                5. The insertAdjacentHTML method is called on the userList element to add the HTML code to the end of the element
                6. If an error occurs, the catch block logs the error to the console.
                7. fetchData function is called with the URL argument to initiate the fetch and DOM update process.

- **Promise:**
    - `.then` and `await` are methods that wait for the response before continuing the execution of the code
    - **Promises:**
        - handle **async** operations (eg. fetching data from an API or reading a file)
        - provide a mechanism to represent *eventual* completion (or failure) of an asyn operation
        - allows developers to write code, that can wait for the completion of the operation *without blocking the main thread*
        - Consist of 3 parts:
            - **Executor function:**
                - the function that is passed to the **Promise constructor** when it's created
                - Takes 2 parameters (`resolve` and `reject`) -> functions that signal thecompletion of the operation
                - the async operation takes place in the executor function, and then on completion either `resolve` or `reject` is called (with the **result** or **error**)
            - **The state:**
                - The **Promise** can have 3 different states:
                    - **Pending** - when created
                    - **Fulfilled** - when operation is completed *successfully*. (can't change status after)
                    - **Rejected** - when an *error* occurs. (can't change status after)
            - **The result:**
                - When a *Promise* is **fulfilled**, it returns a `value` -> this is called the **result**.
                    - Can be any value (object, array, string)
                - When a *Promise* is **rejected**, it returns an `error` -> returns an Error object or any other type of value.