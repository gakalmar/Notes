# React
### **Getting Started:**
- BACKEND:
    - `npm init` -> initialize project (creates package.json file)
    - Add further dependencies:
        - `npm i express`   // if we will be using express
        - `npm i -D nodemon`   // only needed on backend
            - add to "scripts" line `"start": "nodemon App.js"` to package.json file (React has default initializer, so this is only needed if we don't use React!)
            - or as a dev if you install with `-D`: `"dev": "nodemon index.js"`
            - add `"type": "module"` line as well

- FRONTEND:
- After cloning or creating the repo and navigating into it, initialize the React app with VITE:

        npm create vite@latest <name>   // To create a new project
        npm create vite@latest .        // To crete just the files withi a project

- Installation:
    - Select REACT, then JS + SWC framework
    - Then run `npm i` to install any dependencies
    - `npm i react-router-dom` - this will very likely be needed too

- Add "type: module" line to package.json file to be able to work with modern JS (import-export) // Already included in vite

- Add proxy exception to `vite.confing.js` file:

        import { defineConfig } from 'vite'
        import react from '@vitejs/plugin-react'

        // https://vitejs.dev/config/
        export default defineConfig({
            plugins: [react()],
            server: {
                proxy: {
                "/api" : "http://localhost:3000"    // all fetches starting with "/api" will now be routed to the backend server
                }
            }
        })

- **Clean up file:**
    - Delete body in `App.jsx` file
    - Delete logo imports from the same file
    - Delete logo from assets folder

- **Folder structure:**

        | BACKEND
        |   | server.js
        |   | package.json
        |   | data.json
        | FRONTEND
        |   | SRC
        |   | SRC   | ASSETS 
        |   | SRC   | ASSETS            | IMAGES
        |   | SRC   | COMPONENTS 
        |   | SRC   | COMPONENTS        | Component1.jsx
        |   | SRC   | COMPONENTS        | Component2.jsx
        |   | SRC   | PAGES or VIEWS 
        |   | SRC   | PAGES or VIEWS    | A FOLDER for each view with: 
        |   | SRC   | PAGES or VIEWS    | PageName.css 
        |   | SRC   | PAGES or VIEWS    | PageName.jsx 
        |   | SRC   | SERVICES  (fetching functions) 
        |   | SRC   | UTILS     (reusable small functions) 
        |   | SRC   | FEATURES  (single but large functions) 
        |   | SRC   Additional files:
        |   | SRC   
        |   |       | package.json   
        |   |       | package-lock.json   
        |   |       | vite-config.js   
        |   |       | index.html
        |   |       | .gitignore.html !!! Add node_modules after initialization

- **Start project** with `npm run dev`

- **Routing:**
    - first we need to install this as well:

            npm i react-router-dom
    
    - Use `BrowserRouter` from **React-router-dom** to handle multiple pages, instead of conditional rendering
    - You can specify which file should be read on each route in the main.jsx file:

        import React from 'react';
        import ReactDOM from 'react-dom/client';
        import { BrowserRouter, Routes, Route } from "react-router-dom";

        import LandingPage from './Views/LandingPage/LandingPage.jsx';
        import Info from './Views/Info/Info.jsx';

        const root = ReactDOM.createRoot(document.getElementById('root'));
        
        root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />}/>
                    <Route path="/info" element={<Info />}/>
                    <Route path='/areas/:name' element={<Areas />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
        );
    
    - Now we can use `useNavigate` to create different routes (returns a function!):

            import { useNavigate } from 'react-router-dom';

            const navigate = useNavigate();

            // Then use ot for example as the onClick attribute of a button:
            <button onClick={() => navigate("/main")}>Back to Main Page</button>

    - We can also use `useLocation` to get query parameters from the URL: (eg from "http://.../search?paramName=paramValue")
        - More info here: (React side use: https://scientyficworld.org/how-to-use-query-parameters-with-react-router/)

                import { useLocation } from 'react-router-dom';

                const queryParams = new URLSearchParams(location.search);
                const param = queryParams.get('paramName');


    - Or we can use `useParams` hook as well for URL parameters: (eg from "http://.../user/:userId") - dynamic segments

            // If you have a dynamic route like this, you can use the parameters in the page/view's .jsx file:
                    
                    // This is in the main.jsx file:
                    <Route path="/user/:userId" element={<UserProfile />} />

                    // Now in the UserProfile page (or component), we can access "userId" parameter like this:
                    
                    import React from 'react';
                    import { useParams } from 'react-router-dom';

                    const UserProfile = () => {
                        // Access the userId parameter from the URL
                        const { userId } = useParams();

                        return (
                            <div>
                                <h2>User Profile</h2>
                                <p>User ID: {userId}</p>
                            </div>
                        );
                    };

                    export default UserProfile;


### **Introduction:**
- React.js is an open-source JavaScript library used for building user interfaces (UIs) and single-page applications.
- Allows developers to build reusable UI components that can be easily managed and manipulated, providing a faster and more efficient way to build interactive UIs
- React uses a virtual DOM (Document Object Model) and a declarative syntax to allow developers to describe how the UI should look at any given time
    - Updates the actual DOM only with the necessary changes, improving performance and reducing load times.
    - Offers a range of powerful features
        - state management
        - event handling
        - server-side rendering

### **JSX** (*=code that reads JS and HTML at the same time*)
- JSX is a syntax extension for JavaScript that allows developers to write HTML-like syntax within their JavaScript code (easier to understand hierarchy of HTML structure later)
- JSX is not required to use React.js, but it has become the standard way of writing React components. (It is transpiled by tools like Babel to regular JavaScript before it can be run in the browser.)
- Here is an example of a simple React component written using JSX:

        import React from 'react';

        function Button(props) {
        return (
            <button onClick={props.onClick}>
                {props.label}
            </button>
        );
        }

        export default Button;

        // Code breakdown:
        We define a Button component using the "function" syntax
        Within the component function, we use JSX to define the button element that will be rendered to the DOM
        The "props" parameter is used to pass in data to the component, such as the "button label" and the "onClick" handler

### **Prop** (*=same as a parameter in JS*)
- `prop` (short for "property") is a way to pass data from a parent component to a child component
- `props` are **read-only**, which means that a child component cannot modify the props it receives from its parent (new props should be passed if updates are needed!)
    - **Note:** 
        - `props` are passed down in a **unidirectional data flow** from **parent to child**, and **cannot be modified by the child component**
        - If the child component needs to update its data based on user input or other events, it can do so by using `state`, which is a separate concept in React
- `props` are similar to function arguments:
    - They allow a component to be customized and configured for specific use cases

- Example of how props can be used in a React component:

        function Greeting(props) {
        return <h1>Hello, {props.name}!</h1>;
        }

        function App() {
        return (
            <div>
                <Greeting name="Alice" />
                <Greeting name="Bob" />
                <Greeting name="Charlie" />
            </div>
        );
        }

        // Code breakdown:
        "Greetings" component takes a "props" object as an argument, which contains a "name" property
        In the "App" component, we render three Greeting components with different name props

### **Component** (*=same as a function in JS, but with a capital initial letter - creates content for HTML*)
- Keyboard shortcut to create one from template: **rfc**
- a `component` is a reusable piece of UI that encapsulates the functionality and presentation of a portion of the user interface (eg. button or form)
- a `component` can include other components, and each can have their own `state` (can be updated and passed to it's children)
- `components` are created using either `classes` or `functions` (use latter, as that is the newer and also recommended for now, and also more lightweight and fast!)
- `components` can **accept** input data called `props` and can **return** visual elements in the form of HTML, JSX, or other components
- **lifecycle:** various stages of a component's existence, from its creation to its destruction:
    - Components can be mounted, updated, and unmounted, and various methods can be called at different stages of their lifecycle to perform tasks such as initialization, updating, or cleanup.

- Example of a React component:

        import React from 'react';

        function Greeting(props) {
        return (
            <div>
                <h1>Hello, {props.name}!</h1>
                <p>Welcome to React.</p>
            </div>
        );
        }

        export default Greeting;

        // Code breakdown:
        We have defined a functional component named "Greeting" that takes a "single prop name"
        It renders a simple greeting message that includes the "name prop"
        In the body of the component, we are returning a JSX expression that describes the structure of the output:
            This includes a "div" element that contains an "h1" and a "p" element
            The "h1" element includes an interpolated reference to the "name prop", which is enclosed in curly braces.
        The component is then exported using the "export default" syntax, to use in other parts of our application.

- To use this `component` in another component or file, we simply import it like any other module (we use it twice with 2 different name props):

        import Greeting from './Greeting';

        function App() {
        return (
            <div>
                <Greeting name="Alice" />
                <Greeting name="Bob" />
            </div>
        );
        }

        export default App;

### **Event** (*=we add these to elements as eg. onClick={function} and it becomes an event handler for that object*)
- Similar to events in the traditional DOM model but with some differences:
    - they are a way for the user to interact with the UI and trigger specific actions
    - supports many events such as `onClick`, `onChange`, `onMouseOver`, `onBlur`
    - can be attached to any element in the UI

- Example:

        import React from 'react';

        function Button(props) {
            function handleClick() {
                console.log('Button clicked');
            }

            return (
                <button onClick={handleClick}>
                    {props.label}
                </button>
            );
        }

        export default Button;

        // Code breakdown:
        We define a Button component that accepts a "label prop"
        We define a "handleClick" function that logs a message to the console when the button is clicked
        We attach the "handleClick" function to the "onClick" event of the button element using the "onClick" attribute
        We render the button with the "label prop" passed as its text content

- **Note!**
    - the syntax is very similar to the `onclick` attribute of HTML elements. However, it is important to note that using the `onclick` attribute in HTML is **considered a bad practice**.
    - In React.js, the JSX `onClick` syntax works similarly to how you've seen window event listeners

### **Conditional Rendering:** (*=use ternary operator or bool && function format to render based on a certain condition*)
- the process of **displaying** different components or elements **based on certain conditions or states**
- **conditional rendering** can be done using several techniques such as *conditional statements*, *ternary operators*, and *logical operators*

- Example (condition is `isLoggedIn` to see if the user is logged in or not):

        import React from 'react';

        function Greeting(props) {
            const isLoggedIn = props.isLoggedIn;
            if (isLoggedIn) {
                return <h1>Welcome back!</h1>;
            }
            return <h1>Please log in.</h1>;
        }

        // Code breakdown:
        "Greeting" component takes a boolean "prop" "isLoggedIn"
        If "isLoggedIn" is "true", the component displays the first message
        If "isLoggedIn" is "false", the component displays the other message

- Another example using ternary operator:

        import React from 'react';

        function Greeting(props) {
            const isLoggedIn = props.isLoggedIn;
            return (
                <div>
                    {isLoggedIn ? (
                        <h1>Welcome back!</h1>
                    ) : (
                        <h1>Please log in.</h1>
                    )}
                </div>
            );
        }

### **State:** (*=an object, that hold information. Code gets rerendered after each change*)
- a state is an **object** that holds the data which can be **used to render components**
- the state can *change over time*, and when it does, **React will automatically re-render the components** that depend on it -> manage dynamic data
- The `useState` **hook** is a built-in function in React that allows you to add state to your functional components

- Example:

        import React, { useState } from 'react';

        function Counter() {
            const [count, setCount] = useState(0);

            function increment() {
                setCount(count + 1);
            }

            return (
                <div>
                    <p>Count: {count}</p>
                    <button onClick={increment}>Increment</button>
                </div>
            );
        }

        // Code breakdown:
        We define a component called "Counter" that displays a "count" and a button
        The "useState" hook is used to:
            define a "count" state variable with an initial value of 0,
            and a "setCount" function to update it
        The increment function is defined to increment the count value by 1 when the button is clicked

        The "count" value is displayed in the "p" element using curly braces to indicate that it's a JavaScript expression
        The "onClick" event handler is set to the increment function:
            when the button is clicked, the "count" state is updated and the component is re-rendered with the new value
        
        Note that the "useState" hook can be used multiple times in a single component to manage multiple states

### **Effect:** (*=a function that gets executed after the initial render of the page*)
- the `useEffect` **hook** is used to handle side effects in functional components
- **Side effects:** actions that can be triggered when a component is mounted, updated, or unmounted (eg. fetching data, updating the document title, or manipulating the DOM)
- The `useEffect` **hook** is a function that takes two arguments:
    - a **function** that represents the side effect
    - an **array of dependencies** that determines when the side effect should be triggered.
- The **function inside** (*=the first argument*) is executed after the component is rendered for the first time, and then again if any of the dependencies change.
- `useEffect()` gets triggered after the initial render (when the component mounts)
    - When the component is first mounted, the code inside useEffect runs
    - This is where you typically put code that needs to run after the component has been added to the DOM.
    - **Dependency array:** (*=second argument after the callback function*)   
        - Empty dependency array  means the function runs only once, **on load**
        - If we provide a dependency, the function gets executed after each modification of the dependency:

                useEffect(() => {
                    // Code to run on mount and every time `someVariable` changes
                    console.log("Effect ran!");
                    return null
                }, [someVariable]);
                
        - We can also add a **cleanup** (when the function returns another function, it gets executed after the `someVariable` variable inside the **dependecy array** gets unmounted):

                useEffect(() => {
                    // Code to run on mount and every time `someVariable` changes
                    console.log("Effect ran!");

                    return () => {
                        // Cleanup code (optional) when component is unmounted or `someVariable` changes
                        console.log("Cleanup!");
                    };
                }, [someVariable]);


- Example: (fetch data from an API and update the component state)

        import { useState, useEffect } from 'react';

        function MyComponent() {
            const [data, setData] = useState(null);

            useEffect(() => {
                async function fetchData() {
                    const response = await fetch('https://api.example.com/data');
                    const data = await response.json();
                    setData(data);
                }
                fetchData();
            }, []);

            return (
                <div>
                    {data ? (
                        <ul>
                            {data.map(item => (
                                <li key={item.id}>{item.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            );
        }

        // Code breakdown:
        We are using the "useState" hook to define a "data" state variable, which starts as null
        We are also using the "useEffect" hook to fetch data from an API and update the "data" state variable
        The function passed to "useEffect" is an "async function" that fetches data from the API and updates the "data state" variable with the response
        We use an empty dependency array [] to ensure that the function is only executed once when the component is first mounted
        In the component's render function, we check if the "data" state variable is not "null", and if so, we render a list of items
        Otherwise, we render a loading message
        The "key" prop is used to help React identify each list item and improve performance when the list is updated

### **Fetch in React:**
- **fetching** happens using `useEffect`
- Another example (the one in Effect was the first one):

        import React, { useState, useEffect } from 'react';

        function App() {
            const [data, setData] = useState([]);

            useEffect(() => {
                const fetchData = async () => {
                    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                    const jsonData = await response.json();
                    setData(jsonData);
                };
                fetchData();
            }, []);

            return (
                <div>
                    <h1>Todos:</h1>
                    <ul>
                        {data.map(todo => (
                            <li key={todo.id}>{todo.title}</li>
                        ))}
                    </ul>
                </div>
            );
        }

        export default App;

        // Code breakdown:
        We have a functional component named "App" that fetches the todos data from the JSONPlaceholder API using the "fetch()" API in the "useEffect()" hook
        We then store the data in the state using the "useState()" hook
        Finally, we render the data in the component's JSX using the "map()" method to iterate over the data array
        
        We're using the "async/await" syntax to make the asynchronous API call, which is wrapped inside an "async" function named "fetchData()"
        The "fetchData()" function is then called inside the "useEffect()" hook with an empty dependency array to make sure it only runs once when the component mounts

        You can also handle error responses by adding "try/catch" blocks to the "fetchData()" function
        You can pass "query parameters" to the API endpoint using the "fetch()" API's second argument   //?
        Headers can be added using an object in the third argument   // ? Isn't this the second argument?


# **MORE ABOUT REACT:**
- "React is a JavaScript library for building user interfaces"
    - MEANING: *it's designed to solve issues in frontend development*
- History:
    - HTML was designed to serve static data -> JS was only intended to be used for small changes
    - web2 -> social media sites appear, and the need to create more dynamic sites (users add content and interact)
        - Example: **news feed** -> you keep loading the info as you scroll, not all the info at once (it would be a large amount of data!)
    - states are used to indicate a change in the content (a new dataset) insted of "new", "newer", "newerer"
    - Issues with code organization:
        - From coding perspective it's best to keep only relevant code together and separate it into many different files
        - From browser and network perspective it's better to keep as few files as possible
- React ecosystem:
    - Also includes bundlers, compliers:
        - Helps to break down complex UI elements into small, reusable **components**
    - virtual DOM (a big JS object):
        - handles the states of the components and improves performance by minimizing the amount of updates that need to be made to the actual DOM
    - development server (typically started with npm start) is used during development only, not for production purposes!
        - serves the application's **frontend** code (React + JSX + JS)
        - important to note that the **development server** is not the same thing as a **backend server**:
            - A backend server is responsible for handling the application's data and business logic, and it usually communicates with a database and other services.

# **VIDEO COURSE ADDITIONAL MATERIALS:**
- Link: https://www.youtube.com/watch?v=KEoMvroP-r4&list=PLRrX6S8UZpZlFTtdo9RONPO3rYi_UAqmD&ab_channel=MarkoCodes


- **Differences in HTML syntax:**
    - **Self-closing tags:** Tags can self-close in JSX. That is, it is possible to have <div>...</div> as <div ... /> and <span>...</span> as <span ... />. It's not necessary, but you may come across one in the future.
    - **Class and classname:** In JSX, the class attribute is called className.
    - **JSX code is executed at runtime:** JSX code is executed at runtime when the component is rendered, unlike HTML which is executed at the time of loading.
    - One of the major differences between HTML and JSX is that in JSX, you **must return a single parent element**, or it won't compile. It means you need to return something in our return statement, it can be an empty <div> or anything.

- More to add later:
    - Add {Link} and {Outlet}
        - Export/Import: with default there is no destructuring required when importing
    - useState -> Add what we want to see later
    - if we add something outside a hook it will re-render every time there is a change

- Export a project:
    - `npm run build`:
        - copy dist folder to backend folder
        - in server file create endpoint for static file serving:
            - `/dist/index.html`
        - static middleware -> set it to `/dist`:

                app.use(express.static('dist'));
        
        - `yarn build` also does this (is this a better/newer way?)
            - we can then use **Railway** to deploy it to production:
                - we need to create a github repo first for the project

# **Creating context:**
    - `useContext`:
    - Used for consuming the values of a React context. Context provides a way to **pass data through the component tree without having to pass props manually at every level**.
    - Example:

            import React, { createContext, useContext } from 'react';

            // Step 1: Create a context
            const ThemeContext = createContext();

            // Step 2: Create a provider component
            const ThemeProvider = ({ children }) => {
                // You can provide any value you want to share with child components
                const theme = 'light';

                return (
                    <ThemeContext.Provider value={theme}>
                        {children}
                    </ThemeContext.Provider>
                );
            };

            // Step 3: Use the context in a child component
            const ThemedComponent = () => {

                // Consume the context using useContext
                const theme = useContext(ThemeContext);

                return <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#333' : '#fff' }}>Themed Content</div>;
            };

            // Step 4: Wrap your components with the provider
            const App = () => {
                return (
                    <ThemeProvider>
                        <ThemedComponent />
                    </ThemeProvider>
                );
            };

            export default App;

            // Code breakdown:
            We create a ThemeContext using createContext.
            We create a ThemeProvider component that provides a value (in this case, a theme) to its children using the ThemeContext.Provider.
            We create a ThemedComponent that consumes the theme value using useContext(ThemeContext).
            Finally, in the App component, we wrap our components with the ThemeProvider to make the theme value available to ThemedComponent and any other nested components.


# **FURTHER RESOURCES:**

Links to add to this topic:
How to use props:
https://www.freecodecamp.org/news/how-to-use-props-in-react/
React reference overview:
https://react.dev/reference/react
Differences from HTML syntax:
https://www.freecodecamp.org/news/html-vs-jsx-whats-the-difference/

Full course:
https://www.youtube.com/watch?v=KEoMvroP-r4&list=PLRrX6S8UZpZlFTtdo9RONPO3rYi_UAqmD&ab_channel=MarkoCodes

React documentation:
https://react.dev/  // VERY GOOD RESOURCE, USE IT!!!
Vite documentation:
https://vitejs.dev/guide/
Recommended install to help with snippets:
https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets
More snippets:
https://github.com/ults-io/vscode-react-javascript-snippets/blob/HEAD/docs/Snippets.md

Erik's suggestions:
dont use:
    npx create-react-app <name>
use instead:
    npm create vite@latest <name>

no more innerhtml etc., use suggested instead

react components:
    - class based component -> still used, but leave it for now
    - function based component -> mainstream

# EXAMPLES:
- **Login-register page:**
    1. Create project folder (better to start with a git repo, then clone it)
    2. Create `backend` folder, and inside it:
        - `npm install express mongoose cors dotenv bcrypt`
        - `npm install --save-dev nodemon`
        - add `"type": "module"` to the `package.json` file
    3. Create the `index.js` (server) file on the backend and `.env`:
        - Create `.env` file with `PORT` and `MONGO_URI`
        - Create `index.js` file (samples in the sample projects folder)
    4. Go back to the root folder and initialize `vite`:
        - `npm create vite@latest frontend -- --template react` then `y`
        - `cd frontend`
        - `npm install`
        - `npm install react-router-dom`
        - Add `"start": "nodemon index.js"` to the frontend's "scripts"
    5. Set up frontend:
        - In the `src` folder:
            - Create `LoginForm.jsx` and `RegistrationForm.jsx` (samples in sample projects!)
            - Updae `App.jsx` (samples)
    6. Connect backend:
        - Add routes to `/register` and `/login` in the backend's `index.js` file (already implemented in the sample)
        - Add routes to the frontend, to connect to the backend's endpoints (In `LoginForm` and `RegisterForm` files)
    7. Create User model:
        - Create a `models` folder in the backend and add `User.js` file (samples) - already implements password hashing with bcrypt
    8. Create new db in your cluster, and add it to the end of your connection string
    9. Use tokens:
        - Create `/src/context/AuthContext.js` (samples)
