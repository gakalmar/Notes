# DATA TYPES

### - Primitives

1. String ("string1" or 'string2')

        'It\'s a beautiful day!'        //Escape character \
        \\                              //Double backslash to include a single backslash eg. "C:\\User\\Username" -> C:\User\Username
        \n                              //New line character (only works within string)
        \t                              //Horizontal TAB/indent character
        \r                              //Carriage return character ("Text 1 \r Text 2") -> Only "Text 2 will display, because \r makes the cursor go back to the biginning of the line, and start the next print from there.
                                        It's used for exapmle when we do a loading animation, where we have to delete the previously printed line and update it with a new line.
        `string`                        //Template literal - works a bit different than simple '' or "", for example multi line text within will display as multiline, without a \n newline character 
        `${CONSTANT}`                   //Works just like a constant, you can use it to include a previously declared constant or variable within a string as text.
                                        With numbers, the value within is evaluated first, then the result is printed (eg. `${a + b}` -> if a=5 and b=10 -> "15 will print", not "5 + 10")
                                        ONLY WORKS WITH BACKTICK! `
    
    > Strings are immutable, so methods will return new strings instead of modifying the original ones.

2. Number (integer or float/fraction)

    - Integers - whole numbers
    - Floats - fractional numbers

3. Boolean (true or false):

    - Values for non-booleans (Thruthy - Falsy):          
    
            1           true
            0           false
            "a"         true
            ""          false
            Nan         false
            undefined   false
            null        false
            []          true
            {}          true
            
            If we have a constant or variable, and assign a true or false value to it, we also call that truthy and falsy
    
    - Example:

            let name = ``;
            if (name){                                         //name = `` -> empty string is falsy, so 'else' branch will execute
                consoloe.log(`Hello ${name}!`);
            } else {
                console.log(`There was no name provided.`);
            }

4. Undefined

5. null

### - Data structures, non-primitives (eg. Objects, Arrays, Properties, Grouped data)

Commonly OBJECTS are stored within ARRAYS:

    let groupOfPeople = [               //ARRAY is declared with [
        {                               //First OBJECT is declared with {}
            name: "Person1",        
            age: 36
        },                              //COMMA to be used to separate next element in ARRAY
        {                               //Second OBJECT is declared with {}
            name: "Person2",
            age: 34
        }
    ]                                   //ARRAY is closed with ]

#### 1. Arrays

            let arr = ['index0', 'index1', 'index2']        //COMMA to be used to separate items!
            console.log(arr)

    - Access date inside:

            **Arrays have keys too, like objects, but those are not visible. They are the index numbers.

            arr[1]                      //Returns 2nd item in array with index1
            arr[1] = "NewValue"         //Updates array item's value with index [1]

            If the list consists of objects within, we can combine the access methods:
                
            arrayName[2].name           //this will refer to the item with index 2, which should be an object, then reach into that object's key called "name", and refer to its value


    - Common Functions:

            arr.lenght                      //the items within the array
            arr.length-1                    //the last item's index number

            arr.push('item1')               //add item to end
            arr.pop('item2')                //remove item from end
            arr.shift('item3')              //add item to start
            arr.unshift('item4')            //remove item from start

#### 2. Objects

        let person = {
            Key1: 'value1',                  //COMMA to be used to separate items!
            Key2: 42,
            newObject: {
                newObjAttr1: 'value3',
                newObjAttr2: 'value4'
            },
            myFunction: function(var1, var2) {
                console.log('First variable is : ' + var1 + '\n' + 'Second variable is: ' + var2)
            }
        }

Access date inside:

        person.Key1 -> This will refer to 'value1'      //DOT NOTATION -> You enter into the data of person object with the dot .
        person["Key1"]                                  //Same thing, just with [] brackets. "" is also needed to refer to the key (Keys are actually strings within
                                                            an object, but variable names are not strings) - THIS IS IMPORTANT WHEN USING THE KEY VALUE IN A FUNCTION AS PARAMETER!
        person.Key2 -> This will refer to 42

        console.log(person.attribute1)                  //prints value1
        console.log(person.newObject.newObjAttr1)       //prints value3
        person.myFunction('TEST1', person.attribute2)   //executes object's function

        person1.Key2 = 36                               //Assign new value to existing key

# Variables & Constants

        let myName          //Define a variable with no value (empty variable)
        myName = "Gabor"    //After it was declared with the let keyword, we can assign a value to it with = (This time let keyword is not there anymore!)
        myName = "Koni"     //After the value had already a value, we can modify it (reassign value)

        var a = 'This is a variable'        //old way
        let b = 'This is a variable';
        const c = 'This is a constant';     //a constant's value can't be updated later, but if it's and object, its attributes can be modified

> Depending on what you write after *let nameOfVariable = *, you can define it's data type ( {} for OBJECTS, [] for ARRAYS, "" for STRINGS, or just NUMBERS )

### Naming:     
- Start with a-z, _, $
- Include also numbers and A-Z
- No spaces within name
- try to use decriptive names with camelcase: eg. *let myPersonalDetails*
- case insensitive, so myNAME != myName
    
### Reassigning values with new variables:

    let myName = "Jorge"
    let myNewName = "Denis"
    let myName = myNewName  ->  myName will become "Denis"
                                myNewName will stay "Denis"
    
    let myAge = 36
    let myNewAge = myAge    ->  This will make myNewAge the value of myAge, which is 36
    myAge = 37              ->  This will update myAge, but not myNewAge
                                So myAge will be 37 and myNewAge will stay 36


# Operators
    
### 1. Arithmetic operators:

        \+       Works also with strings (old way of doing concatenation), and variables that are numbers (eg. let number = 10, number + 1 = 11)
        \-       Substraction
        \*       Multiplication
        /       Division

        %       Modulo/modulus - returns the 'leftover' or 'remainder' value after a division (eg. 14 % 5 = 4)
        i++     i = i + 1 | Increment - Add 1 to the current value of the variable 'i' ('i' needs to be declared first)        //To be used only with VARIABLES!
        i--     i = i - 1 | Decrement - Substract 1 of current value                                                           

### 2. Assignment operators:
    
        =       Assigns or reassigns a value to an item or variable
        +=      i = i + x is the same as i += x                             //To be used only with VARIABLES!
        -=      i = i - x
        *=      i = i * x
        /=      i = i / x
    
### 3. Comparison operators:

        ==      equal to                    //These return boolean values
        !=      not equal to
        ===     stricklty equal to          
        !==     stricktly not equal to

    > **Comparing OBJECTS or ARRAYS won't return true even if they consist of the same, because they are different objects with the same value (so let a = {age:18}; b = {age: 18}; a === b will be false). But if we compare the properties inside, they will be true (a.age === b.age will be true)**

        >       greater than                //Mathematiocal operators for numbers only
        <       less than
        >=      greter or equal to
        <=      less than or equal to

### 4. Logical operators (By hierarchy):

        !   NOT     Inverts true or false values
        ||  OR      If at least one value is true, it returns true
        &&  AND     If all values are true, it returns true

### 5. Conditional operators:

        ?:      BOOLEAN ? "valueIfTrue" : "ValueIfFalse"        //This is the TERNARY operator, same as an IF-ELSE statement

### **Hierarchy (also called Precedence):** [FULL LIST HERE](https://www.w3schools.com/js/js_precedence.asp)
      
>        ()                          // Highest priority
>        .
>        !
>        **
>        \*
>        /
>        %
>        \+ \- ""+"" (concat)
>        < <=
>        === !==
>        &&
>        ||
>        ?:
>        = (assignments)             // Lowest priority

# Conditional statements
    
### 1. If-else statement (Remember to use `else if` between the conditions, not `if else`!)
    
        if (cond){
            CODE IF TRUE;
        } else if (cond2) {
            CODE IF ELSE IS TRUE;
        } else {
            CODE IF ALL BEFORE ARE FALSE;
        }

        Alternative way: (TERNARY OPERATOR)
        CONDITION ? ValueIfTrue : ValueIfFalse;
        eg: 4 !== 5 ? "Yes" : "No";

### 2. Loops

#### - **For loop** (Used when you know the number of repetitions):

            for (INITIALIZATION; CONDITION; INCR/DECR){                 //INITIALIZATION - Executed once before the code runs
                BODY;                                                   //CONDITION - Evaluated at the beginning of each loop 
            }                                                           //INCR/DECR - Evaluated after each loop

            Example:

            arr = ['item1', 'item2', 'item3', 'item4', 'item5']         //this is just an array with 5 elements for better understanding
            
            for(let i = 0; i < arrLoop.length; i++) {                   //let i = 0 means i variable's initial value is 0" // i < 5 means until when should it be repeated // i++ means that 1 should be added to 'i' after each step
                console.log(arr[i]);                                    //print arr[0] then arr[1] ... until it reaches limit
            }

                // break to be used in for loops when you want the code to stop immediately (move this to functions!)
                // continue to be used to break current iteration, and moves to the next iteration, so the rest of the code doesn't run for the current one

#### - **For..of loop** (Used to iterate through items in an Array or Object):

            const myArray = [1, 2, 3, 4, 5]
            for (const itemInArray of myArray){                         //itemInArray is just an in-place created constant to refer to each element in the Array or Object
                BODY;
            }

            Example:

            const animals = [                                           //An iterable item always needs to be created first
                {name: 'Mango', type: 'dog', age: 7 },
                {name: 'Berry', type: 'dog', age: 12 },
                {name: 'Mango', type: 'cat', age: 7 }
            ]

            for (const animal in animals){                              //The item we refer to in each iteration is named animal (singular!), and the array is called animals (plural!)
                if (animal.type === "dog"){                             //When you call the nested info, you have to refer to the iteration name, not the arrays name!!!
                    console.log(`${animal.name} is a dog!`);
                } else {
                    console.log(`${animal.name} is not a dog. ${animal.name} is a ${animal.type}`);
                }
            }

#### - **For...in loop:**

            Same as for of, but it's used to iterate over keys of an Object instead:

                let myObject = {key1: "value1", key2: "value2", key3: "value3};
                for (const key in myObject){
                    console.log(key);           //will print "key1", "key2", "key3"
                }

#### - **While loop:**

            let i = 0;                      //the variable is created outside the while loop
            while(i <= 10) {                //while loop only has 1 condition
                console.log(i);             //code that runs in the loop (it will print numbers from 0 to 10)
                i++;                        //add 1 to iteration number
            }

#### - **Do-while loop**
            
                Do-while loops are used when the first iteration is always wanted to be executed, even if the first condition is not true

# Functions

> A reusable block of code

### Ways to declare functions:
        
1. **Regular function:**

            **They can be used before their declaration.

            function funcName(par1, par2) {     //Define function with FUNCTION keyword instead of LET. Then add the name of the function, and () parenthesis.
                //BODY                          //Inside the () the inputs are called parameters, if there are any.
            }

            funcName();                         //Call a function. Evene when there are no parameters, the () are needed to call the function.
            funcName(arg1, arg2);               //Calls the function with the parameters swapped to the input arguments.

2. **Anonymous function** *(=Function expression)*:

            **Just as variables and constants, these can only be called after declaration.

            const varName = function(){         //We can create an anonymous function by storing it in a constant or variable.
                //BODY;                         //Creating it this way we can only call the function AFTER it was created, as opposed to regular creation method
            }

            varName();                          //To call the function, we still need to add the () to the constant's name to call the function.

3. **Arrow function expression:**

            let funcName = (par1, par2) => {    //function name is declared with let keyword, as variables. But then in () the variables are added, and the ARROW => points to the BODY
                return par1 * par2;
            }

            funcName(arg1, arg2)                //It will be called the same way

            let add = (a, b) => a + b;          //Single line functions have no function keyword, no curly braces {} and no rturn keyword, which makes them very quick to create
            let greet = name => `Hi, ${name}!`  //If there is only one parameter, even the single parenthesis can be left.

### Inputs:

- **Global and Local scopes:**

        ##GLOBAL SCOPE
        let x = 10;                     //x is created on the GLOBAL SCOPE (=in the root scope of the file)

        function funcName(){
            return x * 2;               //we can call *x* here, because the function can access GLOBAL SCOPE
        }

        function funcName(){
            ##LOCAL SCOPE
            let x = 2;                  //we are creating *x* variable now in LOCAL SCOPE (=inside the function's scope). If we update the GLOBAL SCOPE *x* variable,
            return x * 2                  we are creating a copy of *x*, and the GLOBAL SCOPE *x* will remain 10.
        }

        So that's why for inputs, we use parameters.
        
- **Parameters:**

    - What is a parameter?

            function funcName(par1, par2 = 'DefaultValue') {        //We can assign a parameter a default value, if it's not called, buy writing it at declaration stage.
                //BODY                                                par1 & par2 are locally created variables, that are only accessible from inside the function (LOCAL SCOPE)
            }

    - We can call a function with a variable created on GLOBAL SCOPE too:

            let x = "John";
            
            funcName(x);                                        //It will be the same as calling the function like this: funcName("John");
        
    - We can even call functions with parameters, that are other functions *(=Callback functions)*:

            function greet(name, callback) {                    //First, we create a function, and one parameter will be another function
                console.log(`Ciao, ${name}!`);
                callback();                                     //We call this other function inside this function here
            }

            function sayGoodbye() {                             //We create the other function
                console.log("Goodbye!");
            }

            greet("David", sayGoodbye);                         //Call the first function, with the second function as an argument (=callback function)

### Output - `return` vs. `console.log()`:

- `return` is used to return a value from a function (exit point), while `console.log()` is used to log data in the console (not function related also):

        function funcName(par1, par2) {     
            return "Return value";          //RETURN keyword is used to return values from the LOCAL SCOPE of the function to the GLOBAL SCOPE. It doesn't print it by default!!!
        }                                     Every function returns a value, even if the return keyword is not used. The default return value is *undefined*

        console.log(funcName(arg1, arg2));  //The return value only gets displayed once it is called with the console log function.

        **return default is undefuned, so even if a function does something (eg. prints something), but the return keyword is not used, it's value will be undefined

# Builtin features

> ### **Method**  
> A function that is associated with an object or an instance of an object, typically used to perform operations on the object or manipulate the object's data.  
> They are basically functions defined as values an object's' key.

- For example:

        const person = {
            firstName: "Martha",
            lastName: "Justice",
            fullName: function() {
                return person.firstName + " " + person.lastName;
            }
            };

- To call them, you need to call the object first, then refer to the key that contains the function:

        console.log(person.fullName()); // Output: "Martha Justice"

### Built in methods in JS

- They are built into JS core library to make it easier to work. Their purposes are:
    - Simplify complex tasks
    - Improve maintainability and readability of code
    - Make code more reusable (consistent behaviour)
    - Improve performance (optimized for JS engine, faster execution)

- Examples:
    - String manipulations functions (`indexOf()`, `replace()`)
    - Number operations (`Math.floor()`, `parseFloat()`)
    - Array manipulation (`push()`, `splice()`)

### Callback builtins / Higher-order functions

- There are some built-in methods that require a callback function (*a function that is called within another function using it's parameter. See more at FUNCTIONS section*)

- `forEach()` is a method, that requires a callback function for example:

    - It allows you to iterate over each element in an array and perform a specific action (`callback function`) for each element.
    - Here's how it works:

            myarray.forEach(function(currentValue, index, array) {
                // Your code here
            });

            myarray: The array you want to iterate over.
            currentValue: The current element being processed in the array.
            index: The index of the current element.
            array: The array that forEach() is being applied to.
    
    - Here's an example with only 1 parameter:

            const names = ["Alice", "Bob", "Charlie", "David"];

            // Create a new array with names followed by an exclamation mark
            const namesWithExclamation = [];
            names.forEach(function(name) {                                                          //Here only name is added to the function as a parameter
                namesWithExclamation.push(name + "!");
            });

            console.log(namesWithExclamation);

            This will be the result:

                ["Alice!", "Bob!", "Charlie!", "David!"]


    - Here's an example with 2 parameters:

            const numbers = [1, 2, 3, 4, 5];

            numbers.forEach(function(currentitem, indexofcurrentitem) {                             //Here 2 parameters are added to the function
                console.log(`Element at index ${indexofcurrentitem} is: ${currentitem}`);
            });

            This will be the result:

                Element at index 0 is: 1
                Element at index 1 is: 2
                Element at index 2 is: 3
                Element at index 3 is: 4
                Element at index 4 is: 5

    - Here's an example with 3 parameters:

                const colors = ["red", "green", "blue", "yellow"];

                colors.forEach(function(currentColor, index, colorArray) {                          //Here 3 parameters are added to the function. colorArray refers to original colors array
                    console.log(`Color at index ${index} is ${currentColor}.`);
                    console.log(`Total number of colors in the array: ${colorArray.length}`);
                });

            This will be the result:

                Color at index 0 is red.
                Total number of colors in the array: 4
                Color at index 1 is green.
                Total number of colors in the array: 4
                Color at index 2 is blue.
                Total number of colors in the array: 4
                Color at index 3 is yellow.
                Total number of colors in the array: 4

- `map()`, `filter()` and `reduce()` amongst others are considered **higher-order functions**, which means that they can take other functions as arguments (*=callback functions*), or they can return a function.

