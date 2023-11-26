# MERN
- **MERN Stack** stands for projects built with:
    - MongoDB
    - Express.js
    - React.js
    - Node.js

### **Client-side routing:**
- **React Router** is a library for managing navigation and handling routing in SPAs:
    - No need for full page reloads
    -  handles the rendering of components based on the URL and browser history

- How to use:
    1. Install `npm i react-router-dom`
    2. Import components:

            import React from "react";
            import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

            const Home = () => <div>Home</div>;
            const About = () => <div>About</div>;
            const Contact = () => <div>Contact</div>;

            function App() {
                return (
                    <Router>
                        <div>
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/about">About</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">Contact</Link>
                                    </li>
                                </ul>
                            </nav>

                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/about" component={About} />
                                <Route path="/contact" component={Contact} />
                            </Switch>
                        </div>
                    </Router>
                );
            }

            export default App;
    
    - Code explanation:
        - `BrowserRouter` component wraps our entire application, providing the necessary context for routing
        - `Link` component creates navigation links that update the URL and render the appropriate component without a full page reload
        - `Switch` component wraps the Route components, ensuring that only one of them is rendered at a time, based on the current URL
        - `Route` components define the mapping between URL paths and React components

- Alternative way as done in tasks previously:
    1. In `main.js` or `index.js` file set it up like this:
            
            import React from 'react'
            import ReactDOM from 'react-dom/client'
            import { BrowserRouter, Routes, Route } from "react-router-dom"
            import Home from './Home/Home.jsx'
            import About from './About/About.jsx'
            import Users from './Users/Users.jsx'
            import './index.css'

            ReactDOM.createRoot(document.getElementById('root')).render(
                <React.StrictMode>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/about' element={<About />} />
                            <Route path='/users/:id' element={<About />} />     // This way we can also pass parameters in the URL to get with useParams on the other side (eg. "import { useParams } from 'react-router-dom'" then "const { id } = useParams()" )
                        </Routes>
                    </BrowserRouter>
                </React.StrictMode>,
            )
    
    2. Then we add to the "view" file:

            import { useNavigate } from 'react-router-dom'
            ...
            export default function View() {
                const navigate = useNavigate();
                ...
                return <button onClick={() => navigate('/about')}>Go to About</button>
            }
    
    3. Get URL parameters also (we get here with the URL "/users/14" for example):

            import { useParams } from 'react-router-dom'
            ...
            export default function View() {
                const { id } = useParams();
                ...
                return <div>The user's ID is: {id}</div>
            }

### **Server-side routing:**
- Some best practices for creating routes and endpoints in Express.js:
    - **API vs UI:** Separate your RestAPI endpoints from the UI server routes. It's the best if you start your API endpoints' route with `/api`.
    - **Express Router:** (not the same as React Router!)
        - Used to modularize routes (keeping the grouped in separate files)
        - How to use:

                // routes/user.js
                import express from "express";
                const router = express.Router();

                // Define your user routes here
                router.get("/", (req, res) => { /* ... */ });
                router.post("/", (req, res) => { /* ... */ });

                module.exports = router;

                // app.js
                import express from "express";
                const userRoutes = require("./routes/user");

                const app = express();
                app.use("/users", userRoutes);

                // ADD ALTERNATIVE WAY HERE FROM EXPRESS VIDEO!

    - **Middlewares:**
        - They allow you to run code before processing the request or sending the response
        - Use middleware for tasks like validation, authentication, logging
        - Keep your middleware functions modular, reusable, and focused on a single task
        - Yon need to use `next()` to jump to the next one to work (req, req, next) -> 3rd parameter
    - **Consistent and RESTful API design:**
        - RESTful API design is an architectural style for designing networked applications (*API = Application Programming Interfaces*)
        - "REST" stands for Representational State Transfer
        - It follows a set of rules to make communication between different software applications easy and effective:
            - **Resources:** In a RESTful API, everything is a resource – a piece of data or a service. Each resource has a unique identifier, typically a URL.
            - **HTTP Methods/CRUD operations:** The API uses standard HTTP methods like `GET` (retrieve data), `POST` (create data), `PUT` (update data), and `DELETE` (remove data) to perform actions on resources. And `PATCH` for any partial updates.
            - **Statelessness:** Every request from a client to a server is independent and contains all the information needed. The server doesn’t keep track of the client's state between requests.
            - **Uniform Interface:** The API provides a consistent way to interact with resources, making it easy for different systems to understand and use it.
            - **Representation:** Resources can have different representations (like JSON or XML), and clients can choose the one they prefer.
    - **Validation:** 
        - Validate input data, such as request body and query parameters, before processing the request. (use middleware libraries for this like `express-validator` or `joi`)
    - **Error handling:**
        - Use also middleware for error handling
        - Always return a proper error response with appropriate HTTP status codes and clear error messages:
                
                // errorHandlingMiddleware.js
                function errorHandler(err, req, res, next) {
                    // Log the error details, e.g., using a logging library like Winston
                    console.error(err);

                    const statusCode = err.statusCode || 500;
                    const message = err.message || "Internal Server Error";
                    res.status(statusCode).json({ error: message });
                }

                module.exports = errorHandler;

                // app.js
                import errorHandler from "./errorHandlingMiddleware";
                // ...
                app.use(errorHandler);
    - **Authentication and Authorization:**
        - Secure your routes by implementing authentication and authorization. 
        - Use middleware functions to authenticate users, e.g., with JWT or Passport.js, and authorize access to specific resources based on roles and permissions.

# **Code arrangement:**
- Best practices:
    - **REACT:**
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

        - **Separate logic and state management:** 
            - Separate your application's logic and state management concerns from the components
            - Use custom hooks, context, or external libraries like Redux to manage your application state. (?)
        - **Reuse styles:**
            - Group reusable style variables, themes, and common CSS into separate files, and import them into your components as needed.
        - **Environment-specific configurations:**
            - Use environment variables and configuration files to manage environment-specific settings like API URLs, feature flags, and secret keys.
    
    - **EXPRESS:**
        - **Folder structure:**
                
                | BACKEND
                |   | src/
                |   |   | routes/
                |   |   |   | users.js
                |   |   |   | products.js
                |   |   | controllers/
                |   |   |   | userController.js
                |   |   |   | productController.js
                |   |   | middleware/
                |   |   |   | authMiddleware.js
                |   |   |   | errorMiddleware.js
                |   |   | models/
                |   |   |   | User.js
                |   |   |   | Product.js
        
        - **Controllers and models:**
            - Separate the business logic (controllers) and data layer (models) into different files.
            - Use controllers to handle request processing, and models to define your data schema and interact with the database.
        - **Middleware:**
            - Organize your custom middleware into separate files and group them in a dedicated folder.
        - **Configuration files:**
            - Use separate files or environment variables for environment-specific configurations and settings.
    
    - **Using REACT and EXPRESS in the same project:**
        - **Separate client and server:**
            - Separate the `React.js` (frontend) and `Express.js` (backend) code into different folders in your project.
        - **Package management:**
            - You can use a single `package.json` file for both frontend and backend, or you can have separate `package.json` files for each.
            - The latter helps manage dependencies independently, which can be beneficial if you later decide to split the frontend and backend into different repositories.
        - **Proxy API requests:**
            - Set up a proxy for the frontend to forward API requests to the backend during development. Add the proxy key to the package.json file in your client folder or use a custom configuration if your frontend build tool supports it:
            - Setup for vite:

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