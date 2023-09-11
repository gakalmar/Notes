# Basic import-export operation:
- **Import**:

        import { name } from './directory/filename.js';

- **Export**:

        export { name };

# Reading a file
- **Definition:** getting information from a file stored on a computer or on a server
- **JSON:** JavaScript Object Notation (*=jelölés*)
- Popular **data format** used for *exchanging information between a server and a client*
- **Parsing** a JSON file means *converting the content of the JSON file into a JS object*, to access and manipulate it


- In Node.js, you can read (parse) files:
    - **synchronously (sync)**:
        - the program waits until the file is read completely before moving on (slow)
                import * as fs from 'node:fs';

                try {
                    const data = fs.readFileSync('file.txt', 'utf8');
                    console.log(data);
                } catch (err) {
                    console.error('Error reading the file:', err);
                }

                Code breakdown:
                Import the built-in "fs" module.
                Use a try and catch block to handle any errors that might occur while reading the file.
                Call readFileSync function with the file name ('file.txt') and encoding ('utf8') as arguments.
                Log the file content to the console.

    - **asynchronously (async)** // Preferable in Node.js environment for better performance
        - the program can keep working on tasks while the file is being read (faster)
        - 3 different syntaxes (example below with callback function):

                import * as fs from 'node:fs';

                fs.readFile('file.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading the file:', err);
                    return;
                }
                console.log(data);
                });

                Code breakdown:
                Import the built-in "fs" module.
                Call readFile function with the file name ('file.txt'), encoding ('utf8'), and a callback function as arguments.
                The callback function takes two parameters: err and data.
                If there's an error (err is not null), log the error to the console and return.
                If there's no error, log the file content to the console.

        - > The file's **data can only be accessed within the callback function** (readFile), because of the nature of working simultaneously on other tasks before finishing.</br>
          > In order to *properly handle data*, place all the code that uses the file's content within the callback function, or use techniques like **promises** or **async/await**.

        - **Promises**
            - If you don't want to use a parameter for error and a callback function, you can use either promises or async/await.
            - A **Promise** in JS is an *object* representing the *completion or failure* of an asynchronous operation (uses `.then()` and `.catch()` methods)
            - Example:

                    import { readFile } from 'fs/promises';

                    readFile('file.json', 'utf8')
                        .then(data => {
                            const jsonData = JSON.parse(data);
                            console.log(jsonData);
                        })
                        .catch(err => console.error('Error reading or parsing the JSON file:', err));
        
        - **Async/Await**
            - It's built on top of promises
            - Use `async` before a function to indicate that it will perform asynchronous operations
            - Inside that function you can use `await` to pause the execution until the **promise** is resolved or rejected
            - Example:
            
                    import { readFile } from 'fs/promises';

                    async function readAndParseJSON() {
                        try {
                            const data = await readFile('file.json', 'utf8');
                            const jsonData = JSON.parse(data);
                            console.log(jsonData);
                        } catch (err) {
                            console.error('Error reading or parsing the JSON file:', err);
                        }
                    }

                    readAndParseJSON();

- **Keywords:**
    - `import`: bring modules, functions, objects or values from other JS files into the current file (examples import the "fs" (file system) module)
    - `error`: refers to a problem/issue occurring during the reading process (eg. inaccessible, not found, no permission to read, etc.)
        - Handling errors: ensure that the program responds appropriately and inform users about the issue -> avoid unexpected crashes
    - `try-catch`: used with *sync* reading (`err` parameter and `callback function` to do the same with *async*)
    - `{ readFile }`: curly braces indicate the import a **named export** (*=specific functions or values that a module makes available for other modules*)
    - `from`: specify the module where we are importing from, followed by the name or path of the module a string
    - `fs/promises`: the name of the module we are importing from (built-in node.js module that provides an API to interact with the file system using promises instead of CB functions. It's an alternative to the "fs" module)
    - > **Summary**:** the line `import { readFile } from 'fs/promises'`; means we're importing the readFile function from the 'fs/promises' module to use it for reading files asynchronously with promises in our script.