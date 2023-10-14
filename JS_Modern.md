# WEB MODULE

## Modern JS

### **0. Definitions:**
- **ECMAScript**: 
    - Short for **ES**, is a standard for scripting languages used on the **client-side**.
    - It's intended to ensure the interoperability of web pages across different web browsers.
    - Standardized by ECMA International in document ECMA-262:
        - Specifies lanugage syntax
        - Specifies the semantics of the core **API** (=*application programming interface*)

### **1. Variable scopes:**
- They refer to the area of the code/program, where they can be accessed.
- 3 types:
    - **Global:**
        - declared outside of functions or blocks
        - can be accessed anywhere in the code
    - **Function:**
        - declared inside functions
        - can't be accessed if we move "outside" of the functions, but we can access them in any **enbedded** function
    - **Block:**
        - declared inside a loop or an if statement
        - can't be accessed if we move "outside" of the functions, but we can access them in any **enbedded** function
        - `var` variables declared in a block can still be accessed outside the block, this is what caused the issues in the past (but not with function scope!!!)

### **2. Arrow functions:**
- They are **function expressions**, so a short way of creating an anonymous function within a variable.
- Created with this syntax: `() => {}`
    - if only 1 parameter is added, then the `()` parentheses can be omitted
    - the value is automatically returned, if the body consists of one statement, and we don't add the `{}` curly braces

### **3. Ternary operator:**
- Short way of writing an if-else statement:

        condition ? valueIfTrue : valueIfFalse;

- Combine it with an arrow function:

        const checkEven = num => num % 2 === 0 ? 'Even' : 'Odd';

        console.log(checkEven(4)); // Output: Even
        console.log(checkEven(3)); // Output: Odd

### **4. Copy:**
- Creating a copy of a **value type** or a **reference type** object is not the same!
- **Shallow copy:**
    - Shallow copy creates a new object/array based on the original one (so the nested objects will still be referenced!)
    - Copy them with *spread operator*, to avoid first level reference copy:

            const arr1 = [1, 2, 3];
            const arr2 = [...arr1];

            arr2.push(4);

            // arr1 -> [1, 2, 3]
            // arr2 -> [1, 2, 3, 4]
    - This won't work if we have multiple levels:

            const arr1 = [
                {name: "Fanni"},
                {name: "David"}
            ]

            const arr2 = [...arr1];         //COPY IS CREATED HERE

            arr2[0].name = "David";

            // both arrays will still contain the original object references, so updating will still cause issues

- **Deep copy:**
    - The simplest way to copy the nested objects is to use `JSON.stringify()` and `JSON.parse()` methods:

            const arr1 = [
                {name: "Fanni"},
                {name: "David"}
            ]

            const arr2 = JSON.parse(JSON.stringify(arr1));      //COPY IS CREATED HERE

            arr2[0].name = "David";
    
    - The issue with this way of making a copy is if we use methods inside them, because those won't work after `.stringify()` and `.parse()`.

### **5. Destructuring:**
- Allows you to extract values from objects and arrays and assign them to variables using a more concise syntax:

        const person = { name: "David", age: 19 };
        const { name, age } = person;       -> Here we create a name and an age variable, with the values of person object's values with the same key name
        const { name, age = 0 } = person;   -> Here we are also assigning a default value to the age variable

        // Same as this:
        const name = person.name;
        const age = person.age;

- With **Objects** we have to name them the same way as the object's original keys!
- For **Arrays** it's a bit different, the important here is to maintain the original order:

        const numbers = [1, 2, 3];
        const [a, b, c] = numbers;          -> Here we create a, b, and c variables by adding them the values in the same order
        const [a] = numbers;                -> Here we only create a
        const [a, ...rest] = numbers;       -> Here we used the spread operator with `rest` parameter, to add all other elements as well

        // Same as this:
        const a = numbers[0];
        const b = numbers[1];
        const c = numbers[2];

### **6. Higher order functions:**
- Functions that take other functions as arguments, or they return another function as a result (eg. `map()`, `reduce()`, `filter()`)
- `forEach` returns `undefined` by default, but these return more than that:
    - `map()`:
        - Takes 3 parameters:
            - **item** - current item being processed in the array
            - **index** - index of the current item being processed in the array
            - **array** - the array map() is called upon

        - Takes an array and applies a given function to each element of the array, creating and returning a new array with the results:

                const numbers = [1, 2, 3, 4, 5];

                const doubledNumbers = numbers.map(function(num) {
                    return num * 2;
                });

                // Same with an arrow function (note the omission of return keyword!):
                const doubledNumbers = numbers.map(num => num * 2);
    - `filter()`:
        - Takes 3 parameters:
            - **item** - current item being processed in the array
            - **index** - index of the current item being processed in the array
            - **array** - the array map() is called upon
        - Takes an array and applies a given function to each element of the array, creating a new array with only the elements that pass a certain test:

                const numbers = [1, 2, 3, 4, 5];

                const evenNumbers = numbers.filter(function(num) {
                    return num % 2 === 0;          // Should return TRUE or FALSE!
                });

                // Same with arrow function:
                const evenNumbers = numbers.filter(num => num % 2 === 0);
        - Note: while `map()` returns an array with **new** items, filter returns a new array **with the original items**.
    - `reduce()`:
        - Takes 2 parameters:
            - a **callback function** as its first argument:
                - This also gets 2 parameters + 2 optional as before:
                    - the first parameter is an **accumulator**, which is similar to a **total** value of the items processed (=*previous value* or *accumulation of the value returned from the previous execution of the callback function*).
                        - the initial value of the accumulator is `0` or the optional **initial value** passed as the second argument.
                    - the second parameter is the **current item**, being processed
                    - **index** - index of the current item being processed in the array
                    - **array** - the array map() is called upon
            - an (optional) **initial value** as its second argument.
        - Takes an array and applies a given function to each element of the array, reducing the array to a single value. 
        - That single value can be basically any data type or structure (primitive, object, array):

                const numbers = [1, 2, 3, 4, 5];

                const sum = numbers.reduce(function(total, num) {
                    return total + num;
                }, 0);

                // Same with an arrow function:
                const sum = numbers.reduce((total, num) => total + num, 0);

### **7. Impport & Export:**
- `import` and `export` are used to share code between different modules to help managing dependencies (**module** is a self-contained piece of code that encapsulates functionality).
- With `import` and `export` statements, **functions**, **objects**, or **values** can be made available to other modules.
- **CommonJS Syntax:**
    - Before ES6 (EcmaScript 2015), JavaScript did not natively support modules, so the CommonJS (CJS) syntax was widely used, especially in Node.js.


    - To export functionality, we can use module.exports:

            //// FILE: math.js
            const add = (a, b) => a + b;
            module.exports = add;

            // To import functionality exported from a different module, we use require:
            //// FILE: app.js
            const add = require('./math.js');
            console.log(add(2, 3));  // prints: 5

            // Multiple exports can be managed by exporting an object:
            //// FILE: math.js
            const add = (a, b) => a + b;
            const subtract = (a, b) => a - b;

            module.exports = {
            add,
            subtract
            };
            
            // And can be imported as follows:
            //// FILE: app.js
            const math = require('./math.js');
            console.log(math.add(2, 3));  // prints: 5
            console.log(math.subtract(5, 2));  // prints: 3
- **EcmaScript (ES6) Syntax:**
    - The EcmaScript 2015 (ES6) introduced native support for modules in JavaScript.
    - In ES6, we use export and import keywords.

            //// FILE: math.js
            export const add = (a, b) => a + b;
            
            // And import it like this:
            //// FILE: app.js
            import { add } from './math.js';
            console.log(add(2, 3));  // prints: 5

            // You can also have default exports:
            //// FILE: math.js
            const add = (a, b) => a + b;
            export default add;
            
            // And import it like this:
            //// FILE: app.js
            import add from './math.js';
            console.log(add(2, 3));  // prints: 5
- The difference between the **common** and **ES6** syntax:
    - **sync** vs **async:**
        - `require` is synchronous - blocks execution until the reqired module is loaded.
        - not an issue on server side (**Node.js**), but can be with some browsers
        - `import` is asynchronous and non-blocking
    - **static** vs **dynamic:**
        - **ES6** is *static*, needs specification of what you want to import/export (*tree shaking* means getting rid of unused stuff).
        - **CommonJS** is dynamic, you can require modules based on runtime conditions. (?)
    - **Top-level** vs. **nested:** 
        - `import/export` needs to be on top level of the module (can't nest them).
        - **CommonJS** has no restricitons
    - **Native support:**
        - **ES6** is not always natively supported (eg. you have to set `"type": "module"` in `package.json` file).
        - **CommonJS** has no restricitons
    - **Live binding:**
        - **ES6** is a read-only live import (updates in export module will be reflected when imported)
        - **CommonJS** copies the values when importing
- (*Babel* and *Webpack* are some examples of module convertors)
