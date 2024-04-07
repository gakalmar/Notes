# Programming Basics questions

## Data Basics

1. **What are the differences between objects, arrays, and primitives in JavaScript? How are they used in programming? How would you access the value of a specific key in an object?**
    - There are 2 basic datatypes in JS:
        - **Primitives/Value types** (string, number (float or integer), boolean, (+undefined, +null))
        - **Data structures/Reference types** (objects, arrays and other grouped data)
    - Differences between arrays and objects:
        - **Arrays:** (represent a list of things)
            - special object, where the keys are the index (these are hidden)
            - Arrays are ITERABLE - `for..of` loop work on them
            - They have a length property
            - Syntax: `let array = [item1, item2];`
            - Access data: `array[index]`
        - **Objects:** (represent 1 thing, with properties)
            - An object has keys, and each key has a value
            - They are NON-ITERABLE - to loop through the values we need to use `for..in` loop (uses Object.keys() to create keys to iterate through first in BG)
            - They don't have a length property by default (we could use Object.keys().length to check though)
            - Syntax:

                    let object = {
                        key1: "value1",
                        key2: "value2"
                    };

            - Access data:
                - `object.key`          //dot notation - use when you know the name of the key
                - `object["keyname"]`   //bracket notation - use with template literals (=backtick strings) & when key includes a special character

2. **Explain the concept of key-value pairs in objects and how they differ from indexed elements in arrays.**
    - Objects:
        - store data within keys, and each key has its associated value.
        - Objects are non-iterable (there is no numeric order in it's data)
        - Each key is basically a string, representing the name of the key, which opens the container that includes the value
        - we call it either with dot notation (obj.key), or bracket notation (obj.["keyname"])
    
    - Arrays :
        - They are iterable, which means there is an order in the data structure:
        - we refer to an array's item with it's index (the position within the array)
        - we call it like this: arr[0];
    
3. **Describe a scenario where you would choose to use an object instead of an array, or vice versa, and explain your reasoning.**
    - I would think of an object as it was a real-life object, where I could store all it's properties inside it's keys (eg. person or movie example)
    - Arrays are rather to keep a list of elements together in an ordered way:
        - Counting the number of items inside them would also be more practical with the length property. 
        - Also sorting them based on different criteria would be possible with an array

4. **How can you retrieve the first and last items of an array?**
    - `arr[0]`, `arr[arr.length-1]`

5. **Identify the five most commonly used primitive types in JavaScript, and provide examples demonstrating when and how to use them?**
    - String, Integer, Float, Bool, null (defines a non-value intentionally), undefined (a value was declared, but wasn't assigned a value yet)

## Algorithm Basics

6. **Provide examples of assignment operators in JavaScript.**
    - Assignment operators (re)assign a value to a previous value or variable:
        - `=`, `+=`, `-=`, `*=`, `/=`, `**=`
        - `i++`, `i--`

7. **Name some of the arithmetic operators in JavaScript.**
    - `+`, `-`, `*`, `**`, `/`, `%`

8. **What are the different comparison operators in JavaScript?**
    - Operators that return boolean values:
        - Equality operators: `==`, `!=`, `===`, `!==`
        - Mathematiocal operators for numbers only: `>`, `<`, `>=`, `<=`
        - Special cases: 
            - `[] === []` will always be false (reference types)
            - `obj1.key === obj2.key` this can be true, if the values are primitives

9. **Name a few logical operators used in JavaScript.**
    - By hierarchy or precedence (desc): `!` NOT, `&&` AND, `||` OR

10. **Explain the differences between a `for` loop, `for of` loop, and `for in` loop in JavaScript.**
    - `for` loop:  
        - **more control:** refer to other item relative to the current one, skip items
        - `for (let i = 0; i < arr.length; i++){}`
    - `for...of` loop:
        - Used to go through every item of an **iterable** (array)
        - `for (const item of array){}`
    - `for...in` loop:
        - Same as `for of`, but used to iterate through the keys of an object (uses `Object.keys()` first to create the keys, then these are called)
        - ``for (const item in object){}`                

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
            function funcName (parameters){
                BODY
                return value
            }

            Call:
            funcName(arguments)   //returns a value, but doesn't log it
    
    - Alternative ways:

        - Anonymous function (=function expression):

            - Declare as variable:
                - `const variable = function(){};`
                - Call as variable: `variable();`

            - Declare as object's key's value (=method):
                    
                    const obj = {
                        key: function(){
                            BODY / BLOCK OF CODE
                        }
                    }

            - Call as object's key: `obj.key()`

        - Arrow function:
            - `const variable = ( parameter(s) ) => { BODY };`
            - Essentially this is also a function stored inside a variable(anonymous), but the syntax is different

15. **How do you pass arguments to a function? Explain the concept of parameter passing and provide an example.**
    - parameters: locally created variables, which exisist within the scope of the function
    - Decalaration stage: we call them parameters
    - Calling stage: we call them arguments
    - Add default values: `function addNums(par1 = 0, par2 = 0){}`
    - rest parameters:
        - when we can add a set of value, without specifying the number (eg a sum fucntion)
        - use `spread` operator: `function sumNums(...pars){}`

16. **What is the difference between function expressions and function declarations? Provide examples of each.**
    - Function declaration: `function funcName(parameter(s)){}`
    - Function expression (=anonymous function stored within a variable or an object's key):

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
    
    - Commonly used with higher order functions

18. **What is the scope of variables in JavaScript functions? Explain the difference between local and global variables.**

    - **GLOBAL scope** is when we create something directly in the root of the file:
    - **BLOCK scope** is something that is created within another element (loop, if statement):
    - **LOCAL (FUNCTION) scope** is our current scope, which is the innermost BLOCK scope we are in
    - **MODULE SCOPE:** since ES6, modules also have their own scope
    - **LEXICAL SCOPE:**
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
        - more control over when to start, when to end looping
        - step (increment amount)
        - possibility to break from loop early
    
    - forEach() method:
        - simplifies the process of the iteration through the elements
        - takes a callback function executed for every element, from start to end
        - easier to read
        - it can take additional parameters for the index and array, but there's no control over the loop's start and end

    - Syntax:

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
        - no trailing commas!     JSON.parse("[1, 2, 3, ]")       //Syntax error
        - no single quotes!       JSON.parse("'hello'")           //Syntax error
    - **Javascript** data format:
        - object based data (key-value pairs, similar to JSON), but more flexibility on syntax
        - executable code (programming logic)
        - more data types (functions)

25. **How would you create a JavaScript data structure from the data in a JSON file?**

    - **Parsing** a JSON file means *converting the content of the JSON file into a JS object*, to access and manipulate it. We need to read the data first! (see below)
    - First read the file with `fs` node module. For this we need to import the module:
            
            import * as fs from 'node:fs';
    
    - Then we can read **synchronously**, or **asynchronously**, eg.:

            fs.readFile('file.txt', 'utf8', (err, data) => {        // readFile is an async operation (sync version is readFileSync)
                if (err) {
                    console.error('Error reading the file:', err);
                    return;
                }
                const jsonData = JSON.parse(data);      //PARSING DONE HERE
                /// ALL FUNCTIONS TO BE CALLED HERE, THAT REQUIRE IMPORTED 'DATA' VARIABLE ///
            });
        
    - Then the read file can be parsed with `JSON.parse(text, [reviver])`:

            let jsonData = JSON.parse(data);

        - Example for the use of the reviver function (we can filter the data that is read):

                JSON.parse(
                    '{"p": 5}',
                    (key, value) =>
                        typeof value === "number"
                        ? value * 2 // return value * 2 for numbers
                        : value, // return everything else unchanged
                    );
                    
                // Output will be: { p: 10 }
    
25. **Promises vs. Async / Await:**
    - **Promises**
        - A **Promise** in JS is an *object* (**Promise object**) representing the *completion or failure* of an asynchronous operation (uses `.then()` and `.catch()` methods)
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

    - **Blocking / Non-blocking**:
        - describes the code behaviour:
            - **non-blocking -> async**: It doesn't wait for an operation to complete before continuing with the rest of the program (the operation is ran in the background).
            - **blocking -> sync**: It waits for the operation to complete before continuing with the rest of the program. Program might become unresponsive while waiting.

## View Basics

26. **Explain the difference between JavaScript object data structure and DOM data structure.**
    - **DOM** *(=Document Object Model)*
        - **Tree structure:**
            - a way of representing hierarchical relationships between elements (**root** element, **child** elements, **edges** connect children at same level)
            - each element is called a **node**, while the last elements are called **leaves** or **leaf-nodes**
            - Typical hierarchy is `<html>`, then `<head>`/`<body>`, then other tags like `<div>`, `<h1>` or `<p>`
        - You can **interact with** and **manipulate** the tree through the DOM
            - means *access*, modif*y, *delete*, or *add* elements and attributes (crud operations):
            - eg. `insertAdjacentHTML()` and `getElementById()`
    - **JS Object Data Structure:**
        - Can have multiple parents
        - Object based data storage (key-value pairs)

27. **What are the necessary steps to change the content of an HTML element using JavaScript?**

    1. Access element by an attribute: 
        - `const root = document.getElementById("rootId");` (or use `querySelector()` - `".class"`/`"#ID"` )
    2. Do something with that element:
        - `root.insertAdjacentHTML("beforeend", "<div>text</div>")` (add new element after)
        - `root.innerHTML("<p>text</p>")` (change it's content)
        - `item.setAttribute("class", "myClass")` (change its attributes)

## Event Basics

28. **Define an event listener in JavaScript.**

    - **Event:** 
        - An action that happens in the browser usually due to user interaction (eg mouseclick, load, select)
    - **Event listener** 
        - The mechanism that is used to check if an event occurs, and triggers the **event handler** (they work together and are essetinally the same thing).
        - We **register** these, when they are attached to an event of an element
        - We can attach multiple listeners to 1 element
        - We can add a single on to the parent element, and it will also get triggered on its children (event bubbling)
    - **Event object**:
        - the object the event is attached to
        - refer to it with `e` or `event` parameter in it's event handler function
        - `e.target` is the element the event happened on (not necessarily the event object, if bubbling happens!) 

    - **Adding an event listener:**    
        - `addEventListener()` - attach an eventlistener to an HTML element:
                
                window.addEventListener('load', function () {
                    console.log('All resources have finished loading!');
                });

29. **Outline the steps involved in changing the content of an HTML element when it is clicked.**

    1. Access element by an attribute: 
        - `const root = document.getElementById("rootId");` (or use `querySelector()` - `".class"`/`"#ID"` )
    2. Attach an event listener:
        - `root.addEventListener("click", e => e.target...)` (you can do operations with it in the callback, refering to it with `e.tartget`)

30. **Inside a `click` event listener, how can you access the element that was clicked?**
        
    - refer to it in the **event handler** with `e.target`, which is the second parameter, when attaching (a callback function)
    - A few examples:
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
        - if you want to add multiple block elements next to each other, you should use `inline-block` (you can still control the size, but they can be placed next to each other)

32. **Explain the distinctions between `position: relative` and `position: absolute` CSS properties.**
    
    - Position value types:
        - **Static:**
            - Default value. Elements are positioned based on the normal flow of the document (based on their size, and type, like block or inline).
        - **Relative:** 
            - offset the static value
        - **Absolute:** 
            - offset relative to its parent or the document body if there's no other parent
        - **Fixed:**
            - Positioned relative to the viewport
            - They remain in the same position even after scrolling
    
    - Adjust with `top`, `right`, `bottom`, `left` properties, eg:
    
            .box {
                position: relative;         //position relative to it's normal position (the static value)
                top: 50px;                  
                left: 100px;
            }
        
33. **What is the box model? Name the CSS properties associated with it.**

    - describes how HTML elements are represented as rectangular boxes on a web page.
    - 4 components:
        - **Content:**
            - the area where text, images and other media are displayed
            - defined by the height and width of an element
        - **Padding:**
            - Space between content and border (`padding` property)
        - **Border:**
            - A line that surrounds the content and padding area (`border` property)
        - **Margin (block type only):**
            - The space between the border and surrounding elements (`margin` property)
    - The **actual size of an element** is determined by the sum of its content (padding, border, and margin). 
    - Example:

            .box {
                width: 300px;
                height: 200px;
                padding: 20px;
                border: 1px solid black;
                margin: 10px;
            }

34. **Identify the CSS properties that affect font and text appearance.**

    - **Typography toolset:**
        - `font-family`
        - `font-size` 
        - `line-height` 
        - `font-weight` (100 to 900)
        - `font-style` (italic, oblique (=bold?))
        - `text-decoration` (inder/overline, strikethrough)
        - `text-alignment` (L, R, C, Justified)
        - `color` (font color)
        - `background-color` (BG color)

35. **List the steps for adding or removing a class name from an HTML element.**
    
    1. Access element by an attribute: 
        - `const root = document.getElementById("rootId");` (or use `querySelector()` - `".class"`/`"#ID"` )
    2. Add/remove attributes:
        - `element.classList.add("active");`                   
        - `element.classList.remove("inactive");`
        - `element.classList.toggle("highlight");`             // Turn it on and off
        - `element.setAttribute("class", "myClass")`           // rename attribute

## JavaScript - Language Specialties

36. **Elaborate on the differences between value and reference data types in JavaScript, specifically in relation to objects and primitives.**

- **"Value"** refers to primitive data types (e.g., numbers, strings, booleans, undefined, null):
    - Characteristics:
        - **stored** directly in memory locations
        - they are **immutable** (their values can't change after declaration -> any modification creates a new value)
        - when **storing it in a variable or passing it to a function**, the copy of the value is passed
        - When **comparing** primitive values, you are comparing their actual values (e.g., `a === b`)
- **"Reference"** refers to reference data types (e.g., objects, arrays, functions, dates).
    - Characteristics:
        - **stored** by reference (they just point to a memory location, where the actual data is)
        - they are **mutable** (values can be changed)
        - when **storing it in a variable or passing it to a function**, the pointer is passed, so it will refer to the orignial data
        - When **comparing** objects, you are comparing their references in memory, not their content (so they can have identical values, still not be equal, if were created separately)

37. **Discuss the concept of mutability and immutability in objects, arrays, and primitives, and explain why it is important to understand when working with data structures in JavaScript.**

    - Primitive values are immutable, while objects are mutable:
        - modifying a mutable value copies the value itself (the reference)
        - modifying an immutable value creates a new piece of data

38. **Is `null` considered an object or a primitive in JavaScript?**

    - **null** is a primitive value often used to indicate the intentional absence of an object value.

39. **"What does `undefined` represent in JavaScript?"**

    - **undefined** is a primitive value that represents the absence of a value or an uninitialized variable (unassigned).

40. **When would you use `var`, `let`, and `const` in JavaScript?**

    - **var** is the old way of declaring a variable
        - issues can happen, because of hoisting (when the functions and variables are read wihtout contents, in the beginning phases)
        - `var` has global or function scope, not `block` scope like `let` and `const` -> issues with loops or if statements
        - they can be redeclared (var name; var name -> works, but let name; let name -> error (Already declared))

    - **let** 
        - its value can be modified
    - **const**
        - its value can't be changed (unless it's an object, then its values can be modified)
        - common way to declare functions (function expressions), so they are not overwritten (but they have to be declared before calling them!)

41. **Explain the concept of hoisting in JavaScript.**

- In the **compilation phase** (when the **sytax parser** runs) `var` and `function` declarations (but not assignments!) are moved to the top of their containing scope, which means you can refer to them before they are declared in the code (their values will be `undefined` still at this stage!)

## Git

42. **Discuss the advantages of using a version control system.**
    - A distributed version control system (DVCS) is a system that helps developers track changes of their code.
    - **Advantages:**
        1. **Storage and backup:**
            - Create `repositories` (=folders for projects)
            - A decentralized online `backup` storage system, to make your code available from anwhere
        2. **Collaboration:**
            - Availability to work on separate `branches` (all members on the team can work in collaboration)
            - Availability to `merge` separate pieces of work (prevent conflicts)
            - Each other's codes can be `reviewed`
        3. **Version control:**
            - One of the main purposes is `trackability` of the modifications (track versions)
            - Commit messages for `documentation`
            - Branches make availability for `experimentation` with unreleased code
        4. **Open Source and Integration:**
            - Vast `ecosystem of tools and services` built around it (GitHub, GitLab)

43. **Clarify the differences between Git and GitHub.**
    - **GIT**
        - It's a `distributed version control system` (DVCS), that helps developers track changes of their code.
        - It's a `command line tool` that you install on your computer (available offline!)
    - **GitHub**
        - `Online platofrm` that hosts repositories for GIT system
        - It's a `service` for collaboration and online storage
        - `Social network` for sharing `open-source` content for programmers/developers
        - Provies `additional web interface` for those who don't/can't interact through a command line

44. **What is the purpose of remote repositories in Git?**

    - Make your code available from anwhere / code sharing
    - Backup of your code
    - Available for team members / Access control
    - Availability to work in isolation, then only push changes that are ready
    - Version control / track progress
    - Contributing (open-source)

45. **When does a merge conflict occur in Git?**

    - It happens if the automated merge can't happen:
    - Possible **reasons**:
        - **Paralel development (woking on the same branch in 2 different locations):** 
            - When the same code is changed on the same branch. One pushes changes, but the other person started working on it before the push was made (resolve with manual merge)
        - **Merging branches (wokring on different branches):** 
            - When there is some part of the code that was developed on a new branch, but the original branch also had some changes (resolve manual merge)
        - **Rebasing:** 
            - means putting "your code" above the "existing code" -> this will likely cause a merging issue (manual merge)
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
    - `node filename.js` 

47. **What is the keyboard shortcut to stop a running process in the terminal?**

    - **Ctrl + C** on Windows, **Cmd + C** on Mac

48. **How can you retrieve the previous command executed in the terminal?**

    - Using arrows UP and DOWN

49. **How do you navigate to the parent directory of the current directory in the terminal?**
    
    - cd ..
