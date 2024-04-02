# Programming Basics questions

## Data Basics

1. **What are the differences between objects, arrays, and primitives in JavaScript? How are they used in programming? How would you access the value of a specific key in an object?**
    
    - There are 2 basic datatypes in JS:
        - **Primitives/Value types** (string, number (float or integer), boolean, (+undefined, +null))
            - basic data units, these can be grouped together in arrays or objects
        - **Data structures/Reference types** (objects, arrays and other grouped data)
    
    - Differences between arrays and objects:
        - **ARRAYS:**
            - An array is a special type of object, where the keys basically represent the index (they are hidden)
            - Arrays are ITERABLE - `for..of` loop work on them
            - They have a length property
            - Syntax:

                    let array = [item1, item2];
            
            - Commonly we store objects within arrays, and then arrays within the keys of an object:

                    eg. list of movies:

                    let movies =[
                        {
                            **movie1**
                        },
                        {
                            **movie2**
                        },
                    ];

            - Access data:

                    refer to item:
                    array[index]

                    let nums = [1, 2, 3, 4, 5];
                    console.log(nums[0])    //will print 1

                
        - **OBJECTS:**
            - An object has keys, and each key has a value
            - They are non-iterable - to loop through the values we need to use `for..in` loop (uses Object.keys() to create keys to iterate through first in BG)
            - They don't have a length property by default (we could use Object.keys().length to check though)
            - Syntax:

                    let object = {
                        key1: "value1",
                        key2: "value2",
                        key3: "value3",
                    };
            - We use them to store data with different properties/attributes in them:

                    eg. movie:

                    {
                        title: "Goonies",
                        runtime: 124,
                        releasedate: 1986,
                        genres: [list of items]
                    }
            
            - Access data:

                    refer to item:
                    object.key          //dot notation - use when you know the name of the key
                    object["keyname"]   //bracket notation - use with template literals (=backtick strings) & when key includes a special character

                    let obj = {name: "John", age: 34}
                    console.log(obj.name);      //will print "John"
                    console.log(obj["age"]);    //will print 34
    

2. **Explain the concept of key-value pairs in objects and how they differ from indexed elements in arrays.**

    - Objects store their data within keys, which means all entries have a key, and an associated value.
        - Objects are non-iterable (there is no numeric order in it's data)
        - Each key is basically a string, representing the name of the key, which opens the container that includes the value
        - we call it either with dot notation (obj.key), or bracket notation (obj.["keyname"])
    
    - Arrays are iterable, which means there is an order in the data structure:
        - we refer to an array's item with it's index (the position within the array)
        - we call it like this: arr[0];
    
3. **Describe a scenario where you would choose to use an object instead of an array, or vice versa, and explain your reasoning.**

    - I would think of an object as it was a real-life object, where I could store all it's properties inside it's keys (eg. person or movie example)
    - Arrays are rather to keep a list of elements together in an ordered way:
        - Counting the number of items inside them would also be more practical with the length property. 
        - Also sorting them based on different criteria would be possible with an array

4. **How can you retrieve the first and last items of an array?**

    - First item:

            arr[0]

    - Last item:

            arr[arr.length-1]

5. **Identify the five most commonly used primitive types in JavaScript, and provide examples demonstrating when and how to use them?**

    - String - "text"
        - Use it to store text
    
    - Numbers - Float (1.09023) or Integers (14)
        - Use them to do mathematical operations

    - Booleans - true or false values
        - Used for comparison (eg 50 > 34)
        - within if statement's conditions and ( `if (array.length < 50){}` ) 
        - to check if anything existist already (eg. key of an object)
    
    - null - define a non-value

    - undefined - eg a variable was declared, but it's value wasn't assigned yet

## Algorithm Basics

6. **Provide examples of assignment operators in JavaScript.**

    - Assignment operators (re)assign a value to a previous value or variable

            =       Assigns or reassigns a value to an item or variable
            +=      i = i + x is the same as i += x                             //To be used only with VARIABLES!
            -=      i = i - x
            *=      i = i * x
            /=      i = i / x
            **=     i = i ** x

            i++     i = i + 1 | Increment - Add 1 to the current value of the variable 'i' ('i' needs to be declared first)        //To be used only with VARIABLES!
            i--     i = i - 1 | Decrement - Substract 1 of current value  

7. **Name some of the arithmetic operators in JavaScript.**

        +       Works also with strings (old way of doing concatenation), and variables that are numbers (eg. let number = 10, number + 1 = 11)
        -       Substraction
        *       Multiplication
        **      Exponential (2 ** 3 = 8)
        /       Division
        %       Modulo/modulus - returns the 'leftover' or 'remainder' value after a division (eg. 14 % 5 = 4)

8. **What are the different comparison operators in JavaScript?**

    - Operators that return boolean values

    - Equality operators:

            ==      equal to                    
            !=      not equal to
            ===     stricklty equal to          
            !==     stricktly not equal to
    
    - Mathematiocal operators for numbers only:

            >       greater than                
            <       less than
            >=      greter or equal to
            <=      less than or equal to

    - Special cases:

            [] === [] will always be false, because the content is the same, but it's in a different "box"
            obj1.key === obj2.key this can be true, if the key's values are the same

9. **Name a few logical operators used in JavaScript.**

    - By hierarchy or precedence (desc):
        
            !   NOT     Inverts true or false values
            &&  AND     If all values are true, it returns true
            ||  OR      If at least one value is true, it returns true

10. **Explain the differences between a `for` loop, `for of` loop, and `for in` loop in JavaScript.**

    - For loop:
        - Used for more complex operations (i iterable can be used as an index to refer to other items in the array as well)
        - with arr[i] we always refer to the original array item, therefore we can change it's value

                for (let i = 0; i < arr.length; i++){
                    CODE BODY
                }

                let i = 0 - executed at the beginning, once (i is a variable used to count the number of iterations/loops)
                i < arr.length - condition to check if the next loop should start
                i++ - Executed at the end of the code - value increment, to count loops and not to run infinitely

    - For...of loop:
        - Used to go through every item of the iterable (array):
        - `item` refers to the current item in the array (similar to `array[i]`), but it's just a local variable (can't access original)

                for (const item of array){
                    CODE BODY;
                }

    - For...in loop:
        - Same as for of, but used to iterate through the keys of an object (uses `Object.keys()` first to create the keys, then these are called)
                
                for (const key of obj){
                    CODE BODY;
                }


11. **If you can't use any built-in functions or methods, how would you calculate the average of values in an array?**

        let sum = 0;
        for (let item of array){
            sum += item;
        }
        let avg = sum/array.length;

## Function Basics

12. **What is a function in JavaScript? Explain its purpose and how it is used in programming.**

    - A function is a reusable block of code, that when executed will become a value (return).

    - Purpose is to reuse code whenever possible, by collectiog a set of commands/code to be executed.

13. **Describe the different syntax elements that make up a JavaScript function.**

    - Syntax:

            Declare:
            function funcName (parameter(s)){
                BODY / BLOCK OF CODE
                return value
            }

            Call:
            funcName(argument(s))   //returns a value, but doesn't log it
    
    - Alternative ways:

        - Anonymous function (=function expression):

                Declare as variable:
                const variable = function(){};

                Call as variable:
                variable();

                Declare as object's key's value (=method):
                const obj = {
                    key: function(){
                        BODY / BLOCK OF CODE
                    }
                }

                Call as object's key:
                obj.key()

        - Arrow function:

                const variable = ( parameter(s) ) => { BODY };

                Essentially this is also a function stored inside a variable, but the syntax is different
                

15. **How do you pass arguments to a function? Explain the concept of parameter passing and provide an example.**

    - parameters are locally created variables, which exisist within the scope of the function
    - we use them to add input data to a function to work with

    - Decalaration stage:

            function addNums(par1, par2){       //We call these parameters at this stage
                return par1 + par2; 
            }

    - Calling stage:

            addNums(arg1, arg2)                 //At this stage we call them arguments

    - Add default values:

            function addNums(par1 = 0, par2 = 0){}      //We can call the function with less arguments as well like this
    
    - rest parameters:

        - when we want to keep the possibility of adding multiple arguments to our function, we can use this when we create the function:

                function add(...pars){              //rest parameters with spread operator must be the last one!
                    let result = 0;
                    for (let par of pars){
                        pars += par;
                    };
                };

                add(1, 2, 5, 7);                    //Both calls will be valid, regardless of how many arguments we call it with
                add(12, 23);

16. **What is the difference between function expressions and function declarations? Provide examples of each.**

    - Function declaration:

            function funcName(parameter(s)){BODY}

    - Function expression (=anonymous function stored within a variable or an object's key (methods)):

            const addNums = function(par1, par2){return par1 + par2};

            const addnums = (par1, par2) => {return par1 + par2};       //Same using arrow function

17. **Explain what a callback function is in JavaScript.**

    - A callback function is when we use a function as a parameter of another function:

            let arrayOfNums = [1, 2, 5, 6, 7];
            
            function logNums(nums, callback){
                nums.forEach(num => {
                    console.log(num)
                    callback(num);
                })    
            }

            function oddOrEven(number){
                if (number % 2 === 0){
                    console.log(`${number} is even!`)
                } else {
                    console.log(`${number} is odd!`)
                }
            }

            logNums(arrayOfNums, oddOrEven);
    
    - We use callback functions for some methods:

            arr.sort(callback) -> we have to provide a compare function as a callback to overwrite default

18. **What is the scope of variables in JavaScript functions? Explain the difference between local and global variables.**

    - **GLOBAL scope** is when we create something directly in the root of the file:

            let varGlobal = "value";
    
    - **BLOCK scope** is something that is created within another element (loop, function):

            function getOddNums(arr){
                let oddNums = [];               //created on function's LOCAL scope
                arr.forEach(num => {
                    if (num % 2 !== 0){
                        oddNums.push(num);
                    }
                })
            }
    - **LOCAL scope** is our current scope, which is the innermost BLOCK scope we are in
    - We can access variables created in global scope from anywhere
    - We can access variables created in local scope only from local scope, not from global

## Built-in Features

19. **What are some commonly used built-in functions or methods in JavaScript for working with strings? Provide examples and explain their usage.**

    - Strings are immutable, so any method will always generate a new string.

    - String specific methods:

            string.indexOf("char1")                 //returns the index value of first char1 in string
            string.lastIndexOf("char1")             //returns the index value of last char1 in string
            string.charAt(index)                    //returns the character at a specific index number (indexing also works as with arrays)
            string.charCodeAt(index)                //returns the character's unicode value

            string.concat(str1, " ", str2)          //combines 2 or more strings into a single string (simply "str1" + "str2" will do the same)

            string.toUpperCase()
            string.toLowerCase()
    
            string.split(", ")                      //creates array

            string.startsWith("str")                //bool
            string.endsWith("str")                  //bool

            string.trim()                           //remove whitespaces by default  
            string.trimStart()   
            string.trimEnd()   

            string.substring(index1, index2)       //return substring from index1 (included), to index2 (not included)

    - Non string specific:

            string.length                           //this is rather a property, not a method, hence the missing parentheses

            string.slice(index1, index2)
            string.replace(what, withwhat)
            string.replaceAll(what, withwhat)

            string.includes("substr")

            string.repeat(n)

    - Conversion:

            arr.join("")                            //create a string from an array's values

            item.toString()                         //creates string from item (number, object, array, Date)
            num.toString(2)                         //creates binary from number
            String(item)                            //creates string from item


20. **Name at least five built-in functions or methods in JavaScript for manipulating arrays. Describe how each function/method works and provide an example for each.**

    - Add / remove elements:

            arr.push(item)                          //add item to end of array
            arr.pop()                               //remove last item from array
            arr.unshift(item)                       //add item to start of array
            arr.shift()                             //remove first item from array
    
    - Other basic methods:

            array.reverse()
            array.sort()
            array.includes(item)
            array.slice(index1, index2)
            arr.splice(start, number, item1,...itemN)       //removes "number" elements from list from 'start' (included). Then add all the elements listed after it in the parameters.
                                                            //it the also returns a new array with the removed items
    
    - Next generation methods:

            array.forEach(item, [index, arr])       //create operations with each element
            array.map(item, [index, arr])           //return a new array by doing something to each element
            array.filter(item, [index, arr])        //return a new array by applying a specific condition to each element -> include in return array if it's true
            array.find(item)                        //similar to filter, but only returns the first element

            array.reduce(callback(accumulator, currentElement), [initialValue])             //callback function has 2 parameters: (accumulator, currentElement)
                                                                                            //1st iteration: accumulator is the first item of the array initially (unless initial value is specified), and currentElement is the second element
                                                                                            //2nd iteration: accumulator is now the result after the first operation, and currentElement is the third element

            Simple example:

                const numbers = [1, 2, 3, 4, 5];

                const result = numbers.reduce(function (accumulator, currentValue) {
                return accumulator + currentValue;
                }, 10);

                console.log(result); // 25 (sum of all numbers + initial value 10)

            Complex example (find the most common item):

                const numbers = [1, 2, 2, 3, 4, 4, 4, 5, 5, 6, 6, 6, 6];

                const mode = numbers.reduce(function (accumulator, currentValue) {
                    if (!accumulator[currentValue]) {
                        accumulator[currentValue] = 1; // Initialize count for currentValue     //create a key if it doesn't exist
                    } else {
                        accumulator[currentValue]++; // Increment count for currentValue        //if key exists, add 1 to it
                    }
                    return accumulator;
                }, {});                                                                         //accumulator's intial value is {}

                let maxCount = 0;
                let modeValue;

                for (const number in mode) {                                                    //mode returns an object with unique keys and their count as a value
                    if (mode[number] > maxCount) {
                        maxCount = mode[number];
                        modeValue = number;
                    }
                }


21. **How can you use built-in functions or methods in JavaScript to perform mathematical operations? Give examples of commonly used functions or methods for mathematical calculations.**
    
    - Common methods:
        
            Math.min(...array)
            Math.max(...array)
            
            Math.round(Float)
            Math.floor(Float)
            Math.ceil(Float)
            Math.abs(num)
    
    - Generate numbers:

            Math.Pi
            Math.random()

    - Operations:

            Math.pow(num, exp)      //eg Math.pow(2, 3) -> 2^3 = 8
            Math.sqrt(num)          
            Math.sin(num)          
            Math.cos(num)          

22. **What are some built-in functions or methods in JavaScript for manipulating numbers? Describe their functionality and give examples of how they can be used.**

    - Math. operations (see above)

    - Arithmetic operators ( + - * ** / % )
    - Comparison operators (`` < <= > >= === !===)

    - Conversion (Number object methods):
        - `Number("42")`
        - `Number.parseInt()`: create an integer from a string, if it has a numeric representation      //parseInt("42") -> 42
        - `Number.parseFloat()`: create a floating-point number from a string, if it has a numeric representation       //parseFloat("42.1235") -> 42.1235
        - `Number.toFixed(digits)`: Converts a number to a string, rounding to the specified number of decimal places.      //23.34462.toFixed(2) -> 23.34
        - `Number.toPrecision(precision)`: Converts a number to a string with the specified precision (total number of digits).     //23.34465(5) -> 23.344
        - `Number.toString(radix)`: Converts a number to a string in the specified radix (base).    (16).toString(2) -> 1000

23. **Discuss the differences between `for` loops and the `forEach` method in JavaScript.**

    - For loops:

        - More control over:
            - when to start, when to end looping
            - step (increment amount)
            - possibility to break from loop early
    
    - forEach() method:

        - simplifies the process of the iteration thorugh the elements
        - takes a callback function executed for every element, from start to end
        - easier to read
        - it can take additional parameters for the index and array, but there's no control over the loop's start and end

    - Syntax:

        - sample array:
        
                const numbers = [1, 2, 3, 4, 5];
        
        - Using a for loop:
        
                for (let i = 0; i < numbers.length; i++) {
                    console.log(numbers[i]);
                }

        - Using forEach:
        
                numbers.forEach(function (number) {
                    console.log(number);
                });

                Using a callback function:

                const numbers = [1, 2, 3, 4, 5];

                // Define a separate callback function
                function processNumber(number) {
                    console.log(number * 2); // Example: Double each number
                }

                // Use forEach with the callback function
                numbers.forEach(processNumber);                

## File Basics

24. What distinguishes JavaScript data structures from JSON data structures?
    
    - **JSON:**
        - **JSON:** JavaScript Object Notation (*=jelölés*)
        - Popular lightweight text-based **data format** used for *exchanging information between a server and a client*
        - Strict syntax (eg. key names in objects are always within parenthses "", string also always use double quotes)
        - Doesn't include functions or executable code
        - example:

                {
                    "name": "John",         //note keys are within parentheses!
                    "age": 30,
                    "city": "New York"
                }
    
    - **Javascript** data format:
        - object based data (key-value pairs, similar to JSON), but more flexibility on syntax
        - executable code (programming logic)
        - more data types (functions)

    - Examples for data conversion:

            JSON.parse("{}"); // {}
            JSON.parse("true"); // true
            JSON.parse('"foo"'); // "foo"
            JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
            JSON.parse("null"); // null

            NB:
            no trailing commas!     JSON.parse("[1, 2, 3, ]")       //Syntax error
            no single quotes!       JSON.parse("'hello'")           //Syntax error

25. **How would you create a JavaScript data structure from the data in a JSON file?**

    - **Parsing** a JSON file means *converting the content of the JSON file into a JS object*, to access and manipulate it. We need to read the data first! (see below)
    - `JSON.parse(text, [reviver])`:

            let jsonData = JSON.parse(data);

        - Example for the use of the reviver function:

                JSON.parse(
                    '{"p": 5}',
                    (key, value) =>
                        typeof value === "number"
                        ? value * 2 // return value * 2 for numbers
                        : value, // return everything else unchanged
                    );
                    
                // Output will be: { p: 10 }
    
    - In Node.js, you can **read files**:
        - **synchronously (sync):**
            - The program waits until the file is read completely before moving on (slow)

                    import * as fs from 'node:fs';

                    try {
                        const data = fs.readFileSync('file.txt', 'utf8');
                        console.log(data);
                    } catch (err) {
                        console.error('Error reading the file:', err);
                    }

                    // Parsing done after:
                    const jsonData = JSON.parse(data);

                    // Code breakdown:
                    // Import the built-in "fs" module.
                    // Use a try and catch block to handle any errors that might occur while reading the file.
                    // Call readFileSync function with the file name ('file.txt') and encoding ('utf8') as arguments.
                    // Log the file content to the console.
                    
        - **asynchronously (async):** 
            - The program can keep working on tasks while the file is being read (faster)
            - Preferable in Node.js environment for better performance

            - Ways to read data:
                1. Read file with **callback function:**
                        
                        import * as fs from 'node:fs';

                        fs.readFile('file.txt', 'utf8', (err, data) => {
                            if (err) {
                                console.error('Error reading the file:', err);
                                return;
                            }
                            const jsonData = JSON.parse(data);      //PARSING DONE HERE
                            /// ALL FUNCTIONS TO BE CALLED HERE, THAT REQUIRE IMPORTED 'DATA' VARIABLE ///
                        });

                - The  function can be declared separately (this is the best practice!):

                        import * as fs from 'node:fs';

                        // Call it separately:
                        fs.readFile("data.json", "utf8", dataRead)

                        // Then create dataRead callback function:
                        let dataRead = (err, data) => {
                            if (err){
                                console.error(err);
                                return;
                            }
                            ***
                            try {
                                let jsonFile = JSON.parse(data);
                                movieDB.movies = jsonFile.movies;
                            } catch {
                                console.error(`Error parsing the JSON data: `, err);
                            };
                            ***
                            // const jsonData = JSON.parse(data);      //PARSING DONE HERE IF WE DON'T USE TRY
                            /// ALL FUNCTIONS TO BE CALLED HERE, THAT REQUIRE IMPORTED 'DATA' VARIABLE ///
                        }

                        // Code breakdown:
                        // Import the built-in "fs" module.
                        // Call readFile function with the file name ('file.txt'), encoding ('utf8'), and a callback function as arguments.
                        // The callback function takes two parameters: err and data.
                        // If there's an error (err is not null), log the error to the console and return.
                        // If there's no error, log the file content to the console.

                -   > The file's **data can only be accessed within the callback function** (readFile), because of the nature of working simultaneously on other tasks before finishing.</br>
                    > In order to *properly handle data*, place all the code that uses the file's content within the callback function, or use techniques like **promises** or **async/await**.

                2. **Promises**
                    - If you don't want to use a parameter for error and a callback function, you can use either use promises or async/await.
                    - A **Promise** in JS is an *object* representing the *completion or failure* of an asynchronous operation (uses `.then()` and `.catch()` methods)
                    - Example:

                            import { readFile } from 'fs/promises';

                            readFile('file.json', 'utf8')
                                .then(data => {
                                    const jsonData = JSON.parse(data);
                                    console.log(jsonData);
                                })
                                .catch(err => console.error('Error reading or parsing the JSON file:', err));
                
                3. **Async/Await**
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

    - **Blocking / Non-blocking**:
        - desribe code behaviour with asynchronuous operations (only async?)
        - **non-blocking**: It doesn't wait for an operation to complete before continuing with the rest of the program (the operation is ran in the background). While waiting for the operation to complete, the program can run other operations in the meantime, and proceed with it after it's done.
        - **blocking**: It waits for the operation to complete before continuing with the rest of the program. Program might become unresponsive while waiting.

    - **Keywords:**
    - `import`: bring modules, functions, objects or values from other JS files into the current file (examples import the "fs" (file system) module)
    - `error`: refers to a problem/issue occurring during the reading process (eg. inaccessible, not found, no permission to read, etc.)
        - Handling errors: ensure that the program responds appropriately and inform users about the issue -> avoid unexpected crashes
    - `try-catch`: used with *sync* reading (`err` parameter and `callback function` to do the same with *async*)
    - `{ readFile }`: curly braces indicate the import a **named export** (*=specific functions or values that a module makes available for other modules*)
    - `from`: specify the module where we are importing from, followed by the name or path of the module a string
    - `fs/promises`: the name of the module we are importing from (built-in node.js module that provides an API to interact with the file system using promises instead of CB functions. It's an alternative to the "fs" module)
    - > **Summary**:** the line `import { readFile } from 'fs/promises'`; means we're importing the readFile function from the 'fs/promises' module to use it for reading files asynchronously with promises in our script.

## View Basics

26. **Explain the difference between JavaScript object data structure and DOM data structure.**
    - **DOM** *(=Document Object Model)*
        - **Tree structure:**
            - a way of representing hierarchical relationships between elements (**root** element, **child** elements, **edges** connect children at same level)
            - each element is called a **node**, while the last elements are called **leaves** or **leaf-nodes**
        - You can **interact with** and **manipulate** the tree through the DOM
        - Manipulation of the DOM using JavaSript means access, modify, delete, or add elements and attributes:
            - eg. `insertAdjacentHTML()` and `getElementById()`
        - **DOM's structure**  = HTML tree:
            - Root element: usually `<HTML>` tag (window -> document -> html)
            - Direct children of `<HTML>` are `<HEAD>` and `<BODY>`
            - Other elements like `<H1>` or `<P>` can be nested inside the body.
    - **JS Object Data Structure:**
        - Can have multiple parents
        - Object based data storage (key-value pairs)

27. **What are the necessary steps to change the content of an HTML element using JavaScript?**

    1. Access element by an attribute:

            const root = document.getElementById("rootId");

            // Alternative ways:
            document.querySelector(".myClass")                          //get the first object with a specific class (make it a const to store it)
            document.querySelector("#myID")                             //get the first object with a specific Id (make it a const to store it)
            document.querySelectorAll("p")                              //get an array of objects with a CSS selector (make it an array to store them)

    2. Do something with that element:

            // Add new element after:
            root.insertAdjacentHTML("beforeend", `<div>text</div>`)

            // Change it's content:
            root.innerHTML("<p>text</p>")                               //Gets or sets the HTML content of an element
            root.textContent = "New text content";                      //replaces/adds new text content to an element (returns `null` for "document" or "doctype")
                                                                        //!!! removes all children first, and then fills it up with just text content!

            // Manipulate it's attributes:
            item.setAttribute("class", "myClass")                       //"class" attribute's new value will be "myClass"
            item.removeAttribute("class")                               //removes the attribute from an element

            // Remove the element:
            root.remove()

            //Clone an element:
                // 1 Get a reference to the node you want to clone
                const originalNode = document.getElementById('originalNode');

                // 2 Clone the node (deep clone, including child nodes)
                const clonedNode = originalNode.cloneNode(true);

                // 3 Append the cloned node to the DOM
                document.body.appendChild(clonedNode);

## Event Basics

28. **Define an event listener in JavaScript.**

    - **Event:**
        - ACTIONS - They happen in the browser, usually due to user interaction / change of state of the web page.
        - eg click, mouse movement, load event, etc.
    - **Event listener** 
        - The mechanism that is used to check if an event occurs, and triggers the **event handler** (they work together and are essetinally the same thing).
        - We **register** these, when they are attached to an event of an element
        - `addEventListener()` method is commonly used to attach an eventlistener to an HTML element:
                
                window.addEventListener('load', function () {
                    console.log('All resources have finished loading!');
                });
    - **Event object**:
        - the object the event is attached to (see more below)
        - refer to it with `e` or `event` parameter in it's event handler function
        - `e.target` is the element the event happened on (not necessarily the event object, if bubbling happens!) 

29. **Outline the steps involved in changing the content of an HTML element when it is clicked.**

    1. Access element by an attribute:

            const root = document.getElementById("rootId");

            // Alternative ways:
            document.querySelector(".myClass")                          //get the first object with a specific class (make it a const to store it)
            document.querySelector("#myID")                             //get the first object with a specific Id (make it a const to store it)
            document.querySelectorAll("p")                              //get an array of objects with a CSS selector (make it an array to store them)

    2. Attach an event listener:

            root.addEventListener("click", function(event){
                event.target -> refer to triggered element
                // ACTIONS TO BE EXECUTED AT CLICK
            })

            // Benefits:
            // Multiple can be attached to 1 object / 1 event
            // Add it to the parent element of multiple objects (bubbling)
            // Add it to the parent element of multiple objects, and filter with event delegation to set which ones it should be applied to

    - (old way is to add a function on the `onclick` attribute)

30. **Inside a `click` event listener, how can you access the element that was clicked?**
        
    - Access triggered element from inside the function:

            root.addEventListener("click", function(event){
                event.target -> refer to triggered element
                // ACTIONS TO BE EXECUTED AT CLICK
            })

    - A few examples why this can be good:
        - `console.log(e.composedPath())`       to log all parents of the element (composedPath() is a built-in method on `e` event)
        - `console.log(e.target.textContent)`   to log text content through `e` event's object
        - `console.log(e.target.value)`         to log the value of the input box
        - `console.log(e.target.tagName)`       to log just the tag name

## Design Basics

31. **What are the differences between `display: block`, `display: inline`, and `display: inline-block` in CSS? When would you use each display property, and how do they affect the layout and behavior of elements?**
    
    - **Block type elements** (`div`, `p`, `h1-h6`, `ul`, `ol`, and `form`):
        - by default their display attribute is set to `block`
        - default behaviour:
            - **Display:** Displayed as block-level boxes
            - **Widht:** Block-level elements take up the full width of their parent container
            - **Height** determined by the content or specified by developer
            - **Flow:** new line is created after the element
            - **Box model:** elements have padding, border, margin
            - **Child elements:** can contain other block & inline elements

    - **Inline type elements** (`span`, `a`, `img`, `em`, and `strong`):
        - by default their display attribute is set to `inline`
        - default behaviour:
            - **Display:** Displayed as inline boxes
            - **Width:** They just take up the necessary width to display 
            - **Height** determined by line-height and font-size
            - **Flow:** no new line after the element
            - **Box model:** elements have padding, border (no margin!)
            - **Child elements:** can only contain inline elements
    
    - We can overwrite these values with CSS! (`div` -> *make it inline* or `span` -> *make it block*)
    
    - `display: inline-block`:
        - An element with `display: inline-block` remains inline-level, meaning it can appear inline with other elements, just like text, but it also acts as a block-level container, allowing you to set a width, height, margins, and padding.
        - When you want elements to appear next to each other horizontally, but also control their width and height. This is useful for creating things like navigation menus or lists of items.
        - It's commonly used in creating grid systems, where you have a series of elements arranged horizontally with equal or variable widths. You can use it to create responsive grid layouts.
32. **Explain the distinctions between `position: relative` and `position: absolute` CSS properties.**
    
    - Position value types:
        - **Static:**
            - Default value. Elements are positioned based on the normal flow of the document.
        - **Relative:**
            - Positioned relative to their normal position in the document.
            - Adjust with `top`, `right`, `bottom`, `left` properties
        - **Absolute:**
            - Positioned relative to their nearest positioned ancestor (if there is none, then relative to the document body)
            - Adjust with `top`, `right`, `bottom`, `left` properties
        - **Fixed:**
            - Positioned relative to the viewport
            - They remain in the same position even after scrolling
            - Adjust with `top`, `right`, `bottom`, `left` properties
    
    - Example:

            .box {
                position: relative;         //position relative to it's normal position
                top: 50px;                  
                left: 100px;
            }
        
33. **What is the box model? Name the CSS properties associated with it.**

    - The CSS **Box model** is a concept that describes how HTML elements are represented as rectangular boxes on a web page.
    - Used to make designs work well on different devices and screen sizes.</br>
        <img src="csspadding.png" width="400" height="250">
    - 4 components:
        - **Content:**
            - the area where text, images and other media are displayed
            - defined by the height and width of an element
        - **Padding:**
            - Space between content and border (`padding` property)
        - **Border:**
            - A line that surrounds the content and padding area (`border` property)
        - **Margin:**
            - The space between the border and surrounding elements (`margin` property)
    - Example of the CSS box model:

            .box {
                width: 300px;
                height: 200px;
                padding: 20px;
                border: 1px solid black;
                margin: 10px;
            }

    - The **actual size of an element** is determined by the sum of its content (padding, border, and margin). 
        - For example, an element with a width of 300px and a padding of 20px on each side will actually have a total width of 340px (300px + 20px + 20px).

34. **Identify the CSS properties that affect font and text appearance.**

    - **Typography toolset:**
        - `font-family`
            - Set the **font family** for an element.
            - Specify a list of fonts to use, in order of preference (if the first font is not available, the browser will try the next font in the list).

        - `font-size` 
            - Set the **size of the font**.
            - Can be set in pixels, ems, rems, or other units.

        - `line-height` 
            - Set the **height of a line of text**. 
            - Can be set as a number, a percentage, or a length value.

        - `font-weight`
            - Set the **thickness** or **boldness** of the font.
            - Can be set as a number from 100 to 900, or as the keywords normal or bold.

        - `font-style`
            - Set the style of the font, such as **italic** or **oblique**.

        - `text-decoration`
            - Add visual emphasis to text, such as **underlining**, **overlining**, or **striking through**.

        - `text-alignment`
            - Set the horizontal alignment of text within its container, such as **left**, **right**, **center**, or **justified**.

    - **Typography:** Art and technique of arranging type to make written language legible, readable and appealing
        - Basic concepts:
            - **Typeface:**
                - a set of characters that share the same design (eg. Arial, Helvetica)
                - It can include various fonts (blod, italic, egular...)
            - **Font:**
                - A specific size weight and style of a typeface (eg. Arial Bold 12pt is considered a font)
            - **Kerning:**
                - The adjustment of spaces between letters (eg. "VA" letters)
            - **Leading:**
                - The sapce between lines of text.
            - **Tracking:**
                - Adjustment of space between groups of letters, word ot lines of text    
            - **Hierarchy:**
                - Arrangement of text blocks based on importance
                - Allows users to quickly gain crucial information first, then get into the details of a specific topic
            - **Alignment:**
                - The posiioning of text on a page (*left/right-aligned, centered or justified*)
            - **White space:**
                - Empty space around and within elements of a design
                - Used to create visual balance and create the design more readible, appealing.

35. **List the steps for adding or removing a class name from an HTML element.**
    
    1. Access element by an attribute:

            const root = document.getElementById("rootId");

            // Alternative ways:
            document.querySelector(".myClass")                          //get the first object with a specific class (make it a const to store it)
            document.querySelector("#myID")                             //get the first object with a specific Id (make it a const to store it)
            document.querySelectorAll("p")                              //get an array of objects with a CSS selector (make it an array to store them)

    2. Add/remove attributes:

            element.setAttribute("class", "myClass")                    //"class" attribute's new value will be "myClass"
            element.removeAttribute("class")                            //removes the attribute from an element

            element.classList.add("active");                            //Allows you to add, remove, or toggle CSS classes on an element
            element.classList.remove("inactive");
            element.classList.toggle("highlight");                      //Turn it on and off

## JavaScript - Language Specialties

36. **Elaborate on the differences between value and reference data types in JavaScript, specifically in relation to objects and primitives.**

- In JavaScript, data types can be categorized into two main groups: **primitive data types** and **reference data types**. The key distinction between them lies in how they are stored and manipulated in memory.

    - **"Value"** refers to primitive data types (e.g., numbers, strings, booleans).
    - **"Reference"** refers to reference data types (e.g., objects, arrays, functions).

    - **Primitive Data Types (Value Types):**

        - Stored by Value:
            - Primitive data types, such as numbers, strings, booleans, null, and undefined, are stored directly in memory locations.
            - When you assign a primitive value to a variable or pass it as an argument to a function, a copy of the value is made.

        - Immutable:
            - Primitive values are immutable, meaning their values cannot be changed once they are created. 
            - Any operation that appears to modify a primitive value actually creates a new value.

        - Examples:

                let num = 42;
                let str = "Hello";
                let isTrue = true;

    - **Reference Data Types:**

        - Stored by Reference: 
            - Reference data types, such as objects (including arrays and functions), are more complex. They are stored by reference in memory. 
            - When you assign an object to a variable or pass it as an argument, you are working with a reference to the object, not a copy of the object itself.

        - Mutable: 
            - Reference objects are mutable, meaning their properties and values can be changed after they are created.
            - This is because you are working with a reference to the same object in memory.

        - Examples:

                let obj = { name: "John" };
                let arr = [1, 2, 3];
    
    - **Key Differences:**

        - Copy vs. Reference: 
            - When you assign a primitive value to a new variable, you create a copy of that value.
            - With reference types, assigning a variable or passing it as an argument does not create a new object but rather a reference to the existing object.

        - Mutability:
            - Primitive values are immutable, while objects are mutable.
            - You can change the properties and values of objects after they are created, but you cannot modify primitive values.

        - Comparison:
            - When comparing primitive values, you are comparing their actual values (e.g., a === b).
            - When comparing objects, you are comparing their references in memory, not their content:</br>
              (e.g., obj1 === obj2 compares whether they reference the same object, not whether they have the same properties and values).

        - Passing by Value vs. Reference: 
            - When you pass a primitive as an argument to a function, you are passing a copy of the value (pass by value).
            - When you pass an object as an argument, you are passing a reference to the object (pass by reference).

        - Undefined vs. Null:
            - **undefined** is a primitive value that represents the absence of a value or an uninitialized variable. 
            - **null** is a primitive value often used to indicate the intentional absence of an object value.


37. **Discuss the concept of mutability and immutability in objects, arrays, and primitives, and explain why it is important to understand when working with data structures in JavaScript.**

    - Primitive values are immutable, while objects are mutable.
    - You can change the properties and values of objects after they are created, but you cannot modify primitive values.
    
    - **Immutable:**
            - Primitive values are immutable, meaning their values cannot be changed once they are created. 
            - Any operation that appears to modify a primitive value actually creates a new value.

    - **Mutable:**
            - Reference objects are mutable, meaning their properties and values can be changed after they are created.
            - This is because you are working with a reference to the same object in memory.

38. **Is `null` considered an object or a primitive in JavaScript?**

    - **null** is a primitive value often used to indicate the intentional absence of an object value.

            let variable = null; //The value is intentially set

39. **"What does `undefined` represent in JavaScript?"**

    - **undefined** is a primitive value that represents the absence of a value or an uninitialized variable.

            let variable;       //The value is not set, therefore it will be undefined

40. **When would you use `var`, `let`, and `const` in JavaScript?**

    - **var** is the old way of declaring a variable (it causes errors, because of hoisting, because it behaves like declared functions (can be called before they are declared))
        - it also causes errors for example if we declare "i" in for loops with them, or for..of loops' local variables (because they will be seen after as well)
        - they can be redeclared (var name; var name -> works, but let name; let name -> error (Already declared))

    - **let** new way of declaring a variable. We can later change it's value.
    - **const** declare a constant, which cannot be modified later
        - If we declare an array or object as a constant, we can't change them, but we can change their values still
        - common way to declare functions (function expressions), so they are not overwritten (but they have to be declared before calling them!)

41. **Explain the concept of hoisting in JavaScript.**

> *Hoisting is a JavaScript behavior where variable and function declarations</br>
> are moved to the top of their containing scope during the compilation phase.</br>
> This means that you can use variables and functions before they are declared in your code*

- **NB:** they are not really lifted, it's just what happens during the **Creation Stage**, when the **Syntax parser** runs first, it creates variables with undefined values.

- **hositing** means *raising* something above (pre-execute). So it's processed at the start of execution:
    - This is done for variable and function **DECLARATIONS**, but not for their values **ASSIGNMENTS**
    - So after the hoisting phase, these will have an *undefined* value
- Declarations are hoisted, but assignments are not:
    - The line `var phrase = "Hello"` has two actions in it:

        - Variable *declaration* `var`
        - Variable *assignment* `=`

## Git

42. **Discuss the advantages of using a version control system.**
    > A distributed version control system (DVCS) is a system that helps developers track changes of their code.

    1. **Storage and backup:**
        - A decentralized online backup storage system, to make your code available from anwhere
        - Create repositories (=folders for projects)

    2. **Collaboration:**
        - It's available for all members on the team to work in collaboration
        - Availability to work on separate branches
        - Availability to merge separate pieces of work (prevent conflicts)
        - Each other's codes can be reviewed

    3. **Version control:**
        - One of the main purposes is trackability of the modifications, which makes it good to track versions of the code
        - Commit messages for documentation
        - Branches make availability for experimentation with unreleased code
    
    4. **Open Source and Integration:**
        - Vast ecosystem of tools and services built around it (GitHub, GitLab)

43. **Clarify the differences between Git and GitHub.**
    - **GIT**
        - It's a distributed version control system (DVCS), that helps developers track changes of their code.
        - It's a command line tool that you install on your computer (available offline!)

    - **GitHub**
        - Online platofrm that hosts repositories for GIT system
        - It's a service for collaboration and online storage
        - Social network for sharing open-source content for programmers/developers
        - Provies additional web interface for those who don't/can't interact through a command line

44. **What is the purpose of remote repositories in Git?**

    - Version control / track progress
    - Backup of your code
    - Make your code available from anwhere / code sharing
    - Available for team members / Access control
    - Contributing (open-source)
    - Availability to work in isolation, then only push changes that are ready

45. **When does a merge conflict occur in Git?**

    - It happens if the automated merge can't happen:

        - There can be a number of **reasons**:
            - **Paralel development:** 
                - When the same code is changed on the same branch. One pushes changes, but the other person started working on it before the push was made (resolve with manual merge)
            - **Merging branches:** 
                - When there is some part of the code that was developed on a new branch, but the original branch also had some changes (resolve manual merge)
            - **Rebasing:** 
                - if you use the git rebase command to rebase your changes onto another branch, conflicts can arise if there are conflicting changes between your branch and the branch you're rebasing onto.
            - **Cherry-picking:**
                - when you manually select commits to be moved to a separate branch, and there is a conflict between them
        
    - To **resolve a merge conflict**, you typically need to:

        1. Examine the conflicting code in your text editor or integrated development environment (IDE).
            - Conflict markers (e.g., <<<<<<<, =======, >>>>>>>) are added to the code to indicate the conflicting sections
        2. Edit the code to remove the conflict markers and choose which changes to keep.
        3. Save the resolved code.
        4. Add the resolved files to the staging area using git add.
        5. Commit the changes to finalize the merge resolution.

## Terminal

46. **How would you execute a JavaScript file in the terminal?**
    - There are multiple terminal we can choose from, the one I've been using is **GitBash**
        - **PowerShell** is the default in VSCode, but there's also the **CommandPrompt** we can use.
        - **GitBash** is a terminal emulator for Windows, that provides Unix-like command-line environment (Unix-based operating systems are Linux or macOS)
    - If I have the terminal set to the one I want to choose:
        1. open project folder
        2. start new terminal
        3. navigate to my project's root folder or where the file I want to run is located
        4. type in the following command:
            - `node filename.js` 
                - node keyword tells the terminal to use Node.js to interpret the JS file
                - **Node.js** is a JavaScript runtime that allows you to run a JS file outside of a browser.

47. **What is the keyboard shortcut to stop a running process in the terminal?**

    - Keyboard shortcut to stop a running process: **Ctrl + C** on Windows, **Cmd + C** on Mac

48. **How can you retrieve the previous command executed in the terminal?**

    - Using arrows UP and DOWN

49. **How do you navigate to the parent directory of the current directory in the terminal?**
    
    - cd ..
