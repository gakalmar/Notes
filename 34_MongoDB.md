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

# WORKSHOP: https://github.com/raberik98/CC_MongoDB_Mongoose
- In Atlas web: https://cloud.mongodb.com/v2/655c8baad36a28180beb10a1#/overview
    - Database Access - create users
    - Network Access - set up IP address (set it to 0.0.0.0/0 if you just want to practice)
- Cluster > Databases > Collections (JS Array-like) > Records (JS object-like)
- .env (environmental variables):   // There's more info about this above!
    - write here everything that is delicate information
    - dotenv should be installed (npm i dotenv) -> adds it to depencdencies
    - .env should be added to gitignore
- Connect to Atlas:
    - Cluster -> Connect (Compass)
    - Connection string:
        - `"mongodb+srv://gakalmar:xSOg0wVrGRFEwwFi@cluster0.ihsvu61.mongodb.net/"` - connect to cluster (by default calls it "test")
        - `"mongodb+srv://gakalmar:xSOg0wVrGRFEwwFi@cluster0.ihsvu61.mongodb.net/newdb"` - connect to Database called "newdb"
    
    - Connect from server.js file:

            mongoose.connect(process.env.connectionString).then(() => {
                console.log("Succesful connection!");
                app.listen(3000, () => {                                    // Only connect if the connection was successful!
                    console.log("Server is running at port: 3000");
                }).catch((err) => {
                    console.log(err);
                })
            })

- Create models folder:
    - ./models/Testmodel -> we can refer to a collection: collection name will be "tesmodels" inside a database (it will be created if it doesn't exist yet)
    - inside the file:

            import mongoose from "mongoose"

            const tesmodelSchema = new mongoose.Schema({
                // key-value pairs go here:
                key1: {                     // This is called a FIELD
                    type: String,
                    required: true,
                },
                key2: {
                    type: Date,
                    default: Date.now()
                },
                key3: {
                    type: Array // [String] // [{key: String}],
                    default: []
                }
            });

            export default mongoose.model("Testmodel", testmodelSchema) -> tesmodels collection will be created automatically
            export default mongoose.model("Testmodel", testmodelSchema, "anotherCollection") -> specify which collection to connect to

- Now create endpoints in server.js file:

        app.get("/api/v1/getQuestions", async (req, res) => {
            try {
                const data = await Question.find();

                const returnData = data.map((item) => {         // we narrow the return object, so the sensible data isn't sent back
                    return {
                        questionTitle: item.questionTitle,
                        questionDescription: item.questionDescription,
                        answers: item.answers
                    }
                })

                if (data.length > 0) {
                    res.json(returnData);           // We could also return "data" directly, but then all keys will be sent
                } else {
                    res.status(404).json({ message: "No matching data found!" })
                }
            } catch (error) {
                console.error(error); // There should be an error message logger software used for this instead!
                res.status(500).json({ message: "Unexpected error occurred!" })
            }
        })

        app.post("/api/v1/askQuestion", async (erq, res) => {
            try {
                let object = {                                  // In this object we specify exactly what fields should be updated
                    questionTitle: req.body.questionTitle,
                    questionDescription: req.body.questionDescription,
                }
                await Question.create(obj)      // This field creates a new object with all themissing keys as well, if there was a default vaule    
                                                // await makes the error run into the catch branch
                res.status(201).json("Question registered!");
            } catch (error) {
                console.error(error); // There should be an error message logger software used for this instead!
                res.status(500).json({ message: "Unexpected error occurred!" })
            }
        })

        app.get("/api/v1/getSingleQuestion/:id", async (req, res) => {
            try {
                const data = await Question.findOne({_id: "req.params.id" });   // or findById

                if (data.length > 0) {
                    res.json(data);           // Send back original object from DB directly, without modifications
                } else {
                    res.status(404).json({ message: "No matching data found!" })
                }
            } catch (error) {
                console.error(error); // There should be an error message logger software used for this instead!
                res.status(500).json({ message: "Unexpected error occurred!" })
            }
        })

        app.patch("/api/v1/editQuestionTitle/:id", async (req, res) => {
            try {
                const editedData = await Question.findOneAndUpdate(req.params.id, {questionTitle: req.body.questionTitle}, {new:true})  // add params to be overwrittem in second argument
            } catch (error) {
                console.error(error); // There should be an error message logger software used for this instead!
                res.status(500).json({ message: "Unexpected error occurred!" })
            }
        })

        // Another way:
        app.patch("/api/v1/editQuestionTitle/:id", async (req, res) => {            Added to URL /id?what=title
            try {
                const query = req.query.what        // checks if there are query params 
                if (query === "title"){
                    const editedData = await Question.findOneAndUpdate(req.params.id, {questionTitle: req.body.questionTitle}, {new:true});
                    res.json(editedData);
                } else if (query === "description"){
                    const editedData = await Question.findOneAndUpdate(req.params.id, {questionDescription: req.body.questionDescription}, {new:true});
                    res.json(editedData);
                } else {
                    const editedData = await Question.findOneAndUpdate(req.params.id, {questionTitle: req.body.questionTitle}, {new:true});
                    res.json(editedData);
                }
                const editedData = await Question.findOneAndUpdate(req.params.id, {questionTitle: req.body.questionTitle})  // add params to be overwrittem in second argument
            } catch (error) {
                console.error(error); // There should be an error message logger software used for this instead!
                res.status(500).json({ message: "Unexpected error occurred!" })
            }
        })

        app.delete("/api/v1/deleteQuestion/:id", async (req. res) => {
            try {
                await Question.findByIdAndDelete(req.params.id);
                res.json({ message: "Question deleted!"});
            } catch (error) {
                console.error(error); // There should be an error message logger software used for this instead!
                res.status(500).json({ message: "Unexpected error occurred!" })
            }
        })

        app.put("/api/v1/postAnswer/:id", async (req. res) => {
            try {
                const answer = {answer: req.body.answer, user: req.body.user};
                const selectedQuestion = await Question.findById(req.params.id)

                selectedQuestion.answer.push(answer);
                await selectedQuestion.save();

                // Alternative solution
                const selectedQuestion = await Question.findByIdAndUpdate(
                    req.params.id,
                    {$push: {answers: answer}}      // C++ syntax! ($pull is alternative)
                    { new: true }
                )

                res.json({ message: "Answer successfully posted!" })
            }catch (error) {
                console.error(error); // There should be an error message logger software used for this instead!
                res.status(500).json({ message: "Unexpected error occurred!" })
            }
        })

- Backup folder on backend:
    - createBackup.js file inside:

            import mongoose from "mongoose"
            import Question from "./models/Question.js"
            import env from "dotenv";
            import fs from "fs"

            env.config();

            async function Main () {
                await mongoose.connect(process.env.CONSTRING)
                console.log("Connected to database!");

                const questions = await Question.find();
                console.log("Fetched all data from the database!")

                fs.writeFile("./Backup/Questions/json", JSON.stringify(questions), "utf-8", (err) => {
                    if (err) {
                        console.log("Failed to create a backup!")
                        console.log(err);

                        await mongoose.disconnect();
                        consol.elog("Disconnected from database!")
                    } else {
                        console.log("Backup created!");

                        await mongoose.disconnect();
                        consol.elog("Disconnected from database!")
                    }
                })
            }

# TEST REQUESTS:
- Create separate file, where you collect your test endpoints:
    - name it `test.http`. If you have **REST CLient** installed as a VS code extension, it will automatically generate clickable laboels above each request:

            ***clickable request button gets generated here*** 
            GET http://localhost:8080/api/employees/

            ***clickable request button gets generated here*** 
            ###
            POST http://localhost:8080/api/employees/
            Content-Type: application/json

            {
            "name": "Valaki",
            "level": "Godlike",
            "position": "Joker"
            }

            ***clickable request button gets generated here*** 
            ###
            DELETE http://localhost:8080/api/employees/63fc6e4bca1cb463caa21779

            ***clickable request button gets generated here*** 
            ###
            PATCH http://localhost:8080/api/employees/63fc6e4bca1cb463caa21779
            Content-Type:  application/json

            {
            "name": "asd"
            }


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

- **Erik's cheatsheet:**

        show dbs  								                        show all databases
        use [NAME_OF_THE_DATABASE] 						                use one of the databases, or create a new one
        show collections
        db.dropDatabase()
        cls									                            clear the screen
        exit
        db.users.insertOne({})
        db.users.find({name: {$eq: "name1"}})					        here eq means equal 
        db.users.find({name: {$ne: "name1"}})					        not equal
        db.users.find({name: {$in: ["name1","name2"]}}) 			    in this case I can give an array of options for the name property
        db.users.find({name: {$nin: ["name1","name2"]}}) 			    in this case it means not in, so we will find everyone who isn't name1 or name2
        db.users.find({age:{$gt: 18}})						            greater than
        db.users.find({age:{$gte: 18}})						            greater than or equal to
        db.users.find({age:{$lte: 18}})						            less than or equal to
        db.users.find({age:{$lt: 18}})						            less than
        db.users.find({age:{$exists: true}})					        we find where the record has an age property, it will only check if the key exists
        db.users.find({age:{$gte: 18, lte:40}, name: {"name1"}})		greater than or equal to 18 and less than or equal to 40, and the name is name1
        db.users.find({$and: [{age:26}, {name:"name1"}]})			    both requirements must be meet
        db.users.find({$or: [{age: {$tle: 20}}, {name:"name1"}]})		one of the requirements must be meet
        db.users.find({age: {$not:{$lte:20}}})					        here I can find where the requirement is NOT meet (sidenote: when age=null it will be selected too because of $not)
        db.users.find({$expr: {$gt: ["$dept","$balance"]}})			    expr=expression  and I can check if the dept property is greater than the balance property
                                                                        (sidenote: when I put a $ there I let mongodb know that I am compering the properties and not two strings)
        db.users.find({"parents.father.name": {$not:"parentName1"}})    this is how we can use nested objects in a query

        db.users.countDocuments({age:{$gt: 18}})				        simple, it counts the amount of records that metch the requirement(s)

        db.users.updateOne({age:25}, {$set: {age: 26}})				                                    an alternative way to update a singular property
        db.users.updateOne({_id: ObjectId("asd123asd123asd123")}, {$inc: {age: 3}})			            here we increment the found record's age property by 3
        db.users.updateOne({_id: ObjectId("asd123asd123asd123")}, {$rename: {name: firstName}}) 		here we can rename a property to something else
        db.users.updateOne({_id: ObjectId("asd123asd123asd123")}, {$unset: {age: ""}})			        here we can unset/remove a property from the record
        db.users.updateOne({_id: ObjectId("asd123asd123asd123")}, {$push: {hobbies: {"coding"}}}) 	    here we can push data into an array
        db.users.updateOne({_id: ObjectId("asd123asd123asd123")}, {$pull: {hobbies: {"coding"}}}) 	    here we can pull/delete data from an array

        db.users.replace({_id: ObjectId("asd123asd123asd123")}, {name:"newName", age: 30, hobbies: ["coding, swimming"]})	fully replaces the record to what we give as the second argument

        db.users.find({name: {$regex: /^Robert/}})  				    I just simply use a regex here (sidenote: you could write /^Robert/g as well but in this context it makes no difference)

        const regex = new RegExp(`^${req.params.value}`, 'i');
        MyModel.find({ name: { $regex: regex } }, function(err, result) {
        // handle the result
        });

        //Update an object in an array of objects
        [{
            _id: ObjectId("654e00d3245af970a66fa9dd"),
            name: 'Kitten',
            smyptons: [ { sname: 'sim2' }, { sname: 'sim3' } ],
            symptons: { '0': { sname: 'sim2' } }
        }]

        updateOne({name: "Kitten", "smyptons.sname": "sim1"},{$set: {"smyptons.$.sname": "sim3"}});


- David's extra code:

        app.patch("/api/todo/:id", async (req, res) => {
            try {
                const id = req.params.id
                const { toEdit, value } = req.body
                console.log("request came in");

                if (toEdit && value) {
                    console.log(toEdit, value);
                    const todoToEdit = await ToDo.findByIdAndUpdate(id, { [toEdit]: value })
                    console.log(todoToEdit);
                    return res.status(201).json(
                        {
                            status: "updated",
                            message: Todo with id: ${id} was updated. Updated property name: ${toEdit}, value: ${value}
                        })
                } else {
                    console.log("Invalid request");
                    return res.status(422).json({ status: "Invalid request" })
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ status: "Internal server error" })
            }
        })