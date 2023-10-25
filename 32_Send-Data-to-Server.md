# HTTP methods:
- `GET` (this was covered in the previous chapter 31_Serve.md)
    - This method is used to retrieve data from a specified resource. GET requests are read-only and should not modify any data on the server.

- `PATCH` //modify users.json file's inner data
    - This method is used to apply partial modifications to a resource.

- `PUT` //change a user object with another one
    - This method is used to replace the entity at the specified resource with a new one. If the resource does not exist, it may be created.

- `DELETE`
    - This method is used to delete the specified resource.

- `POST`
    - This method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server.

## FORM
- Web forms contain at least a `form` element that includes `input`, `textarea`, and `button` elements. -> user fills this then sends data to server
- Create new endpoint to load **index.html**:

        app.get('/edit', (req, res) => {
            res.sendFile(path.join(__dirname, 'client', 'index.html'));
        });

- Create `inputHTML` and `buttonHTML` elements using functions in **script.js**:

        const inputHTML = name => `<input placeholder="Write the name here" value="${name}">`;
        const buttonHTML = (text, method) => `<button type="submit" data-method="${method}">${text}</button>`;

- Create the first version of the form with another function called `formHTML`:

        const formHTML = (user) => `
            <form id="form" data-id="${user.id}">
                ${inputHTML(user.name)}
                ${buttonHTML("Save", "")}
            </form>
        `;

- Now we can call this to add it to the DOM from our load event function:

        root.insertAdjacentHTML("beforeend", formHTML({id: 0, name: ""}));

- Now add one click event listener to the window and check the clicked target to get user's ID with the click:

        window.addEventListener("click", async event => {
            let userId;
            if (event.target.classList[0] === "user-id"){   // We extract the user ID from the element with the class "user-id"
                userId = event.target.textContent;
            };

            const response = await fetch(`${url}/${userId}`);   // Here we will call the API with the user's ID just extracted
            const data = await response.json();

            const inputElement = document.querySelector('input');     // Get input element, to add the data
            inputElement.value = data.name;                             // ...and add the data as its value

            document.getElementById('form').dataset.id = userId;        // Update the data-id attribute of the form to match the userId
        })

        // Or alternatively with callback function and with Codecool's recommendation: (not working!)

        window.addEventListener("click", e => handleClick(e));
        window.addEventListener("click", handleClick);  //HOGY KELL HIVNI, H MUKODJON?

        const handleClick = async ({ target }) => {
            const userTarget = target.classList.contains('user') ? target : target.closest('.user');

            if (userTarget) {
                const userId = userTarget.querySelector('.user-id').textContent;

                const response = await fetch(`${url}/${userId}`);
                const data = await response.json();

                const inputElement = userTarget.querySelector('input');
                inputElement.value = data.name;

                document.getElementById('form').dataset.id = userId;
            }
        };

- Update fetchData to also return a user's data with a given ID: //If we add a second argument (id) when calling the function, it will fetch that specific user's data. If we don't provide an id, it will fetch all the users' data.

        const fetchData = async (url, id) => {
            try {
                const response = await fetch(id !== undefined ? `${url}/${id}` : url);      
                return await response.json();

            } catch (error) {
                console.error(error);
            }
        }

## PATCH
- Before we start working on accepting other than GET requests we have to add the following lines to the **index.js** file above the first already existing `app.use` line:

        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        // These lines have access to the request (req) and response (res) objects, and perform various tasks such as logging, authentication, data parsing, and error handling for us.

    - `app.use(express.json())`:
        - This line adds middleware to the application to parse incoming requests with JSON payloads.
        - When a client sends a `PATCH`, `POST` or `PUT` request with a JSON payload, the `express.json()` middleware parses the payload and sets the `req.body` property to the parsed JSON object. This makes it easy for developers to work with JSON data in their Express routes.

    - `app.use(express.urlencoded({ extended: false }))`:
        - This line adds middleware to the application to parse incoming requests with URL-encoded payloads.
        - When a client sends a `POST` or `PUT` request with a URL-encoded payload (i.e., data in the format of key-value pairs), the `express.urlencoded()` middleware parses the payload and sets the `req.body` property to an object containing the key-value pairs. 
        - The `extended: false` option tells the middleware to use the classic encoding, which does not support rich objects and arrays in the URL-encoded format.

- Add this now to update the user's name to the **index.js** file:

        app.patch('/users/:userId', async (req, res) => {
            const data = await fs.readFile('./users.json', 'utf8');
            const { users } = JSON.parse(data);
            const userId = parseInt(req.params.userId);
            const user = users.find(user => user.id === userId);

            if (user) {
                user.name = req.body.name;
                await fs.writeFile('./users.json', JSON.stringify({ users }), 'utf8');
                return res.send({ state: "DONE" });
            } else {
                return res.status(404).send({ state: 'User not found' });
            }
        });

- Now we switch to the **scpirt.js** file:
    - Add this line to the main/loadevent functions body:

            window.addEventListener("input", handleInput);
    
    - Then create the handler function (before the function!):

            const handleInput = ({target}) => {
                target.setAttsribute("value", target.value);
            }

            // Input event is the event fired when you are doing anything in an input (or textbox, or select), like changing the text in a text input. 
            // This listener will update the value attribute's value in the DOM, because it doesn't change automatically just because the text in the input changed.
    
    - Update the `formHTML` function:

            const formHTML = (user) => `
                <form id="form" data-id="${user.id}">
                    ${inputHTML(user.name)}
                    ${buttonHTML("Save", "PATCH")}  // PATCH was added as a method here
                </form>
            `;

    - Update the `fetchData()` function:

            const fetchData = async (url, id, method = "GET", body = {name: ""}) => {
                try {
                    const response = await fetch(id !== undefined ? `${url}/${id}` : url, method === "GET" ? {method} : {method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)} );
                    return await response.json();
                } catch (error) {
                    console.error(error);
                }
            }
        
            // For GET requests we don't really need to define the HTTP method for the fetch(), but for all the other methods we have to.
            // Also we have to update the request header and add body. (Yes, that's the body we got on the server side!.)

            // Code Breakdown:
            The method gives the HTTP method (we set its default value to GET)
            The body which at least should have a name key which is empty by default.
            Then the ternary operators decide if we are using the basic GET method or something more complex, so the required data is also added

            !!! In modern ECMA, if the variable (or parameter) name and the key name are the same you don't have to write both like this: {method: method} you can write just once: {method}.

            // FOR COMPARISON, THIS WAS THE ORIGINAL:

            const fetchData = async (url, id) => {
                try {
                    const response = await fetch(id !== undefined ? `${url}/${id}` : url);
                    return await response.json();

                } catch (error) {
                    console.error(error);
                }
            }
    
    - Send the data to the server when the Save button is clicked:
        - We are not using click event, we are using a **submit listener**:

        - Add this to the main/load function's body:
                
                window.addEventListener("submit", handleSubmit);

        - Then create the handler function before the main function:
                
                const handleSubmit = e => {
                    e.preventDefault();
                    const method = e.submitter.getAttribute("data-method");
                    fetchData(url, e.target.getAttribute("data-id"), method, method === "PATCH" ? {name: e.target.querySelector("input").value} : {name: ""})
                }

                // Forms fire the submit event with page reload, which we don't want (we always try to avoid page reload). That's why we call the event (e) parameter's preventDefault() method.
                // Then, check the method from the button's "data-method" attribute with the event (e) parameter's submitter property which reveals the clicked button.

        - Then modify it to this to send it to the Client side:

                const handleSubmit = async e => {
                    e.preventDefault();
                    const method = e.submitter.getAttribute("data-method");
                    const id = parseInt(e.target.getAttribute("data-id"));

                    const result = await fetchData(url, id, method, method === "PATCH" ? {name: e.target.querySelector("input").value} : {name: ""});
                    if (result.state === "DONE") {
                        const users = await fetchData(url);
                        document.getElementById("users").outerHTML = usersHTML(users);
                    }
                }

## POST
- We use PUT when we want to change something completely (eg. use it to replace a user object with another one).
- Create `PUT` handler on the server side (**index.js**). Same as the `PATCH`:

        app.put('/users/:userId', async (req, res) => {
            const data = await fs.readFile('./users.json', 'utf8');
            const { users } = JSON.parse(data);
            const userId = parseInt(req.params.userId);
            const user = users.find(user => user.id === userId);
        
            if (user) {
                user.name = req.body.name;
                await fs.writeFile('./users.json', JSON.stringify({ users }), 'utf8');
                return res.send({ state: "DONE" });
            } else {
                return res.status(404).send({ state: 'User not found' });
            }
        });

- On client  side (**script.js**) add new button to the `formHTML`:

        const formHTML = (user) => `
            <form id="form" data-id="${user.id}">
                ${inputHTML(user.name)}
                ${buttonHTML("Save", "PATCH")}
                ${buttonHTML("Replace", "PUT")}     // THIS LINE WAS ADDED
            </form>
        `;

- Update `handleSubmit()` function:

        const result = await fetchData(
            url, 
            id, 
            method, 
            method === "PATCH" ? 
                { name: e.target.querySelector("input").value } : 
            method === "PUT" ?                                          // THIS WAS ADDED TO THE RESULT, THE REST OF THE FUNDTION WAS KEPT!!!
                { name: e.target.querySelector("input").value, id } : 
                { name: "" }
        );

## DELETE
- Use it if you want to delete something completely
- Server side (**index.js**):

        app.delete('/users/:userId', async (req, res) => {
            const data = await fs.readFile('./users.json', 'utf8');
            const { users } = JSON.parse(data);
            const userId = parseInt(req.params.userId);
            const user = users.find(user => user.id === userId);

            if (user) {
                const newUsers = users.filter((x) => x !== user);       // THIS LINE WAS ADDED
                await fs.writeFile('./users.json', JSON.stringify({ users: newUsers }), 'utf8');    // THIS LINE WAS ADDED
                return res.send({ state: "DONE" });
            } else {
                return res.status(404).send({ state: 'User not found' });
            }
        });

        // FILTER is used to filter OUT, so we can also use it to send back the `user not found` message if it's not found

- Client side (**script.js**):
    - Create new button:
            
            const formHTML = (user) => `
                <form id="form" data-id="${user.id}">
                    ${inputHTML(user.name)}
                    ${buttonHTML("Save", "PATCH")}
                    ${buttonHTML("Replace", "PUT")}
                    ${buttonHTML("Remove", "DELETE")}       // THIS IS THE NEW BUTTON
                </form>
            `;

    - Then add `DELETE` method to `handleSubmit()` too:

           const result = await fetchData(
                url, 
                id, 
                method, 
                method === "PATCH" ? 
                    { name: e.target.querySelector("input").value } : 
                method === "PUT" ? 
                    { name: e.target.querySelector("input").value, id } : 
                method === "DELETE" ?                                           // FROM THIS LINE
                    { id } :
                    { name: "" }
            ); 

## POST
- Add new data using `POST`
- The new ID will initially be zero, then update it based on the last id (id+1)
- Server side (**index.js**):

        app.post('/users/:userId', async (req, res) => {
            const data = await fs.readFile('./users.json', 'utf8');
            const { users } = JSON.parse(data);
            const userIds = users.map(user => user.id);
            const maxId = Math.max(...userIds);
            const newUser = {
                name: req.body.name,
                id: maxId + 1
            }
            users.push(newUser);
            await fs.writeFile('./users.json', JSON.stringify({ users }), 'utf8');
            return res.send({ state: "DONE" });
        });

- Client side (**script.js**):

        const formHTML = (user) => `
            <form id="form" data-id="${user.id}">
                ${inputHTML(user.name)}
                ${buttonHTML("Save", "PATCH")}
                ${buttonHTML("Replace", "PUT")}
                ${buttonHTML("Remove", "DELETE")}
                ${buttonHTML("Add", "POST")}            // NEW BUTTON
            </form>
        `;

    - Prevent empty strings by adding this to the beginning of `fetchData()`:

            if (id && parseInt(id) === 0 && body.name === "") {
                console.log("Empty name is not valid when creating a new user");
                return;
            }
    
    - Extend `submitHandler()` function:

            const result = await fetchData(
                url, 
                id, 
                method, 
                method === "PATCH" ? 
                    {name: e.target.querySelector("input").value} : 
                method === "PUT" ? 
                    {name: e.target.querySelector("input").value, id} : 
                method === "DELETE" ?
                    {id} : 
                method === "POST" ?         // WITH THIS SECTION
                    {name: e.target.querySelector("input").value, id: 0} :
                    {name: ""}
            );
    
    - Manage buttons visibility (`add` parameter -> if `true`, **Add** appears - used ternary operator here):

            const formHTML = (user, add) => `
                <form id="form" data-id="${user.id}">
                    ${inputHTML(user.name)}
                    ${add ? buttonHTML("Add", "POST") : buttonHTML("Save", "PATCH") + buttonHTML("Replace", "PUT") + buttonHTML("Remove", "DELETE")}
                </form>
            `;
        
        - Now also set it's default value to false in `handleSubmit()`:

                document.getElementById("form").outerHTML = formHTML(userData, false);

        - In the main/load functions body, we set it to true (replace exising line that's almost the same without the true value):

                root.insertAdjacentHTML("beforeend", formHTML({id: 0, name: ""}, true));