# MongoDB
- MongoDB is a popular NoSQL database that uses a document-oriented data model to store and manage data.
- Database types:
    - *Relational databases* use rows and tables (like Excel?)
    - **MongoDB** uses **collections and documents**
- **MongoDB Atlas** is a fully-managed **cloud database service** that provides all the features of MongoDB, designed to simlpify the use and management of MongoDB databases in the cloud.
- **MongooseJS** is an Object-Document Mapping (ODM) library for MongoDB and Node.js.
    - more abstrat interface for working with MongoDB (easier to use and more flexible)
    - with **Mongoose** we can:
        - define schemas for our data
        - create models that encapsulate the logic for working with data
        - perform CRUD (Create, Read, Update, Delete) operations on MongoDB collections
        - also provides features like **validation**, **middleware**, and **query building**

### **Schema and Model**
- In MongoDB and Mongoose.js, the terms **schema** and **model** refer to the concepts used to *define and manipulate data structures* in a MongoDB database:
- **Schema:**
    - a **blueprint** for defining the structure and data types of a document **within a collection**
    - allows you to enforce specific rules on the data being stored, such as:
        - required fields
        - default values
        - custom validation
    - A **schema** is created using the **Mongoose.js** library, which provides an easy-to-use API for defining the schema
        - **define a schema** by creating an instance of the `mongoose.Schema` class and specifying the fields and their properties:

                // Import the required modules using ECMAScript Modules syntax
                import mongoose from 'mongoose';        // You also need to "npm install mongoose"
                const { Schema } = mongoose;

                // Define the schema
                const userSchema = new Schema({
                    username: { type: String, required: true, unique: true },
                    email: { type: String, required: true, unique: true },
                    password: { type: String, required: true },
                    createdAt: { type: Date, default: Date.now },
                });

                // Create the model and export it
                const User = mongoose.model('User', userSchema);
                export default User;
- **Model:**
    - a JavaScript object that represents a **collection** in a MongoDB database
    - created from the schema
    - provides an interface for querying, updating, and managing documents within the collection
    - allow you to:
        - enforce the schema rules
        - perform validation
        - apply any additional logic or behavior associated with the collection
    - To **create a model** in Mongoose.js, you use the `mongoose.model()` function, passing the **name** of the collection and the **schema**:

            const User = mongoose.model('User', userSchema);
    
    - Once you have a model, you can:
        - perform various CRUD (Create, Read, Update, Delete) operations on the documents in the collection
        - apply instance and static methods that you define on the schema

### **CRUD**
- **CRUD** operations refer to **Create, Read, Update, and Delete** operations on the data stored in a database
- In our case, we will be using **Mongoose.js** to perform these operations on a **MongoDB database**
- The **Mongoose.js** library simplifies these operations by providing a high-level API for interacting with the database, while also ensuring the **schema validation** and **custom behavior defined by the schema** are enforced

1. **CREATE**
    - Insert a new document using `model.save()`:

        // Create a new User instance:
        const newUser = new User({
            username: 'JohnDoe',
            email: 'john.doe@example.com',
            password: 'password123'
        });

        // Save the new user document to the database
        newUser.save((err, user) => {
            if (err) {
                console.error(err);
            } else {
                console.log('User created successfully:', user);
            }
        });
    
    - Or in 1 step:

        async function createUser() {
            const user = await User.create({ name: "Kyle", age: 26 })   // No need for save as it's included in the create method
        }

2. **READ**
    - Find All items:

            app.get("/api/todo", async (req, res) => {
                try {
                    const todos = await Todo.find()
                    res.json(todos);
                } catch (error) {
                    console.error(error);
                    res.status(500).send({ message: "Failed to get todos!"})
                }
            })

    - Retrieve documents using `model.find` and `model.findOne`:
        
            // First we find all the documents:
            User.find({}, (err, users) => {             // NOTE that .find here finds ALL, not just the first one (behaves like FILTER!)
                if (err) {
                    console.error(err);
                } else {
                    console.log('All users:', users);
                }
            });

            // Find a document by a specific field:
            User.findOne({ username: 'JohnDoe' }, (err, user) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Found user:', user);
                }
            })
    
    - Another way of doing this is `findById`:

            // Modern JS syntax
            async function findBook(id) {
                try {
                    const book = await Book.findById(id)
                    console.log(book);
                } catch (err) {
                    console.eroor(err);
                }
            }

            // Traditional JS syntax:
            Book.findById("655cdc894ce749f386209890")
                .then(book => {
                    console.log(book)
                });
    
    - Use complex queries:

            async function findItem() {
                try {
                    const user = await User.where("age")        // use .where() method to start adding queries
                        .gt(12)                                 // .gt() means greater than (gt, gte, lt, lte)
                        .where("name")                          // chain another condition (by default it's &&)
                        .equals("Kyle")
                        .limit(2)                               // limit the number of results
                        .select("age")                          // only return the "age" field of the matching documents
                }
            }

3. **UPDATE**
    - Modify an existing document unsing `model.findOneAndUpdate` and `model.updateMany`:

            // Modify a single document by a specific field
            User.findOneAndUpdate(
                { username: 'JohnDoe' },
                { email: 'john.newemail@example.com' },
                { new: true, runValidators: true },
                (err, updatedUser) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('User updated successfully:', updatedUser)
                    }
                }
            );

            // Update multiple documents matching a specific condition
            User.updateMany(
                { username: {$in: ['JohnDoe', 'JaneDoe'] }},
                { updatedAt: new Date() },
                (err, updateResult) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('Users updated successfully:' updateResult);
                    }
                }
            );
    
    - Update by ID:

            // Modern JS syntax:
            async function findBookAndUpdateTitle(id, newTitle) {
                try {
                    const book = await Book.findById(id);
                    book.title = newTitle;
                    return book.save();
                } catch (err) {
                    console.error(err);
                }
            }

            // Traditional way:
            Book.findById("655cdc894ce749f386209890")
                .then(book => {
                    book.title = 'New Fancy Title';
                    return book.save();
                })
                .then(book => {
                    console.log(book);
                })
                .catch(error => {
                    console.error(error);
                });

4. **DELETE**
    - Remove documents using `model.findOneAndDelete` and `model.deleteMany`:

            // Delete a single document by a specific field:
            User.findOneAndDelete({username: 'JohnDoe' }, (err, deletedUser) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('User deleted successfully:', deletedUser)
                }
            });

            // Delete multiple documents matching a specific condition:
            User.deleteMany({ username: { $in: ['JohnDoe, 'JaneDoe'] }}, (err, deleteResult) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Users deleted successfully:', deleteResult);
                }
            });
    
    - Delete with `model.deleteOne()`:
        - The difference:
            - `deleteOne()` returns an object with the property deletedCount indicating how many documents were deleted
            - `deleteMany()` returns an object with the property deletedCount containing the number of documents deleted
            - `findOneAndDelete()` returns the deleted document

### **Same Origin Policy, Proxies and CORS errors**
- **Short summary:**
    - Running your app in production vs. running it in development:
        - **production:** Communication happens between BROWSER (Frontend) and SERVER (Backend) only.
        - **development:** We also use a **development server**, which is responsible for serving static files
    - **Same Origin Policy:**
        - JS files can initiate HTTP requests (e.g. with a fetch) to the same origin (scheme + domain + port) where they are originated from, but not to another source (eg when we are running our server and frontend on a different port).
        - This **security mechanism** is called **Same Origin Policy**
    - Solution: 
        - Introducing a **PROXY**, that tricks the browser into thinking the requests are sent to the same place. 
        - The development server gets all the requests, but **the proxy forwards it to the BACKEND** for what we specify (eg. APIs)
        - You can now use URLs for fetching in a short way:

                // ❌ instead of this (localhost:5000 is the backend server's URL)
                fetch("http://localhost:5000/api/users")
                
                // ✅ use this (this request will be sent to your dev server)
                fetch("/api/users")
    - Errors using proxies:
        - you get a **connection refused** or **empty response error** messages
        - these errors are caught by the proxy, and you will see a `500 Proxy Error` in the browser -> Check the **backend server's logs** in this case
    
    - **CORS:**
        - CORS stands for **Cross-Origin Resource Sharing**: The backend server should tell which other origins can have access to its data using complex HEADERS
        - Public APIs (Poke API, Weather API) are working like this
        - CORS is useful in special cases too, e.g. when browser-based email application needs an access to its chat function, and this chat function is running on a different domain.
        - While proxy is a simple and suitable solution to our simple app development, CORS requires a lot of workaround and extra config for our simple use case. It is also really easy to misconfigure it, causing data leaking in production.
        - Use Proxy settings for our use cases, and avoid setting a CORS middleware in the backend server, desipte some websites recommends it to solve the CORS Error.

- Detailed description here: https://journey.study/v2/learn/courses/252/modules/23402/units/16/materials/48762
- video for setting up proxy and deploying an app: https://www.youtube.com/watch?v=N4yUiQiTvwU&t=1s&ab_channel=SamMeech-Ward
- More details:
    - Same-origin policy: https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
    - CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    - Facebook leak because of wrong CORS: https://www.cynet.com/wp-content/uploads/2016/12/Blog-Post-BugSec-Cynet-Facebook-Originull.pdf

### **Environmental variables**
- **Key-value pairs** that store configuration information for applications and the operating system
- They are used to **customize and manage the behavior of applications** and the **system environment** without modifying the code or changing hard-coded values
- Particularly helpful in:
    - managing different configurations for development, staging, and production environments
    - allows developers to keep sensitive data, like API keys or database credentials, separate from the codebase
- Environment variables can be set or modified at the system level or within specific environments, like the terminal or shell session, depending on the needs and scope of the application.

- Real life example:
    - An application might require a database connection string, which includes the username, password, and database server address. 
      Instead of hardcoding this sensitive information in the code, developers can use environment variables to store and access this data securely.
      This approach helps maintain the security and portability of the application, as well as making it easier to manage configurations across various deployment environments.

- Example of code:

        const databaseUrl = process.env.DATABASE_URL;

- In addition to **application-specific variables**, there are also **system environment variables** that can affect the behavior of the operating system and installed software. Examples include:
    - **PATH:** Specifies the directories in which executable programs are located, so that they can be run without specifying the full path.
    - **HOME** or **USERPROFILE:** Indicates the home directory of the current user.
    - **LANG:** Defines the language and locale settings for the system.

# EXTRA INFO:
- **SQL:**
    - NoSQL is a type of database that does not use the traditional table-based relational model used in SQL databases. Instead, it uses a variety of data models, such as document, key-value, graph, and column-based, to store and retrieve data.
    - NoSQL databases are designed to handle large amounts of unstructured and semi-structured data, and they are often used in modern web applications, real-time big data analytics, and mobile applications.
    - The main alternative to NoSQL is SQL (Structured Query Language) databases which follows a relational model.

# RESOURCES & LINKS:
- VIDEO SUMMARY:
    - Mongoose: https://www.youtube.com/watch?v=DZBGEVgL2eE&ab_channel=WebDevSimplified
    - MongoDB:  https://www.youtube.com/watch?v=ofme2o29ngU&ab_channel=WebDevSimplified
    
- Getting started with Atlas: https://www.mongodb.com/docs/atlas/getting-started/
- Getting started with MongoDB: https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/ ***BEST RESOURCE!
- List of all queries: https://mongoosejs.com/docs/queries.html

- FindOne: https://mongoosejs.com/docs/api/model.html#Model.find()
- FindOneAndDelete: https://mongoosejs.com/docs/api/model.html#Model.findOneAndDelete()
- Update an Object: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
- Update or remove data: https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/#update-data

