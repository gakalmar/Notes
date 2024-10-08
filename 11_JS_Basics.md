# DATA TYPES

### - Primitives = Value types
- **Immutable:**
    - Primitive values are immutable, meaning their values cannot be changed once they are declared
    - Any operation/method that appears to modify a primitive value actually creates a new value
    - They are directly stored in the memory

1. **String** ("string1" or 'string2')

        'It\'s a beautiful day!'        //Escape character \
        \\                              //Double backslash to include a single backslash eg. "C:\\User\\Username" -> C:\User\Username
        \n                              //New line character (only works within string)
        \t                              //Horizontal TAB/indent character
        \r                              //Carriage return character ("Text 1 \r Text 2") -> Only "Text 2 will display, because \r makes the cursor go back to the biginning of the line, and start the next print from there.
                                        It's used for exapmle when we do a loading animation, where we have to delete the previously printed line and update it with a new line.
        `string`                        //Template literal - works a bit different than simple '' or "", for example multiline text within will display as multiline, without a \n newline character 
        `${CONSTANT}`                   //Works just like a constant, you can use it to include a previously declared constant or variable within a string as text.
                                        With numbers, the value within is evaluated first, then the result is printed (eg. `${a + b}` -> if a=5 and b=10 -> "15 will print", not "5 + 10")
                                        ONLY WORKS WITH BACKTICK! `

2. **Number** (integer or float/fraction)

    - Integers - whole numbers
    - Floats - fractional numbers

3. **Boolean** (true or false):

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
            " "         true (!!!)
            "0"         true (!!!)
            
            If we have a constant or variable, and assign a true or false value to it, we also call that truthy and falsy
    
    - Example:

            let name = ``;
            if (name){                                         //name = `` -> empty string is falsy, so 'else' branch will execute
                consoloe.log(`Hello ${name}!`);
            } else {
                console.log(`There was no name provided.`);
            }

4. **Undefined**

5. **null**

6. **Bigint** (not necessaty right now)
7. **Symbol** (not necessaty right now)

### **Implicit type coercion:** 
- JavaScript attempts to convert the operands into compatible types so that the operation can be performed:

            + and -             works both for strings and numbers
            str * or / num      mathmetical operations like * and / tries to convert str into a number, if it contains a valid numeric representation (eg. "2" => 2), otherwise it becomes NaN

            Operation types (+- str & num; */ only nums)
            10 + "5"            // 10 is converted to string: "10" + "5" = "105"
            10 * "5"            // 5 is converted to a number: 10 * 5 = 50

            Left to right reading:
            5 + 10 + "b"        // "15b" (10 + 5 is executed first, as both are numbers, then string conversion happens)
            "b" + 5 + 10        // "b510" ("b" + "5" happens first, and then "10" is also added as a string)

### **Explicit conversion:**
        
- String conversion with String(value):

        false       ->      "false"
        23          ->      "23"
        null        ->      "null"

- Number conversion with Number(value):  

        "6"         ->      6
        ""          ->      0
        variable    ->      number if it's value is a number, otherwise NaN
        undefined   ->      NaN (not 0 !!!)
        null        ->      0
        true/false  ->      1/0

- Boolean conversion (see truthy falsy section)

### Iterable vs. non-iterable:

- Iterable objects:
    - String
    - Array
    - TypedArray
    - Map
    - Set

- Non-iterable objects:
    - Object data types


### - Data structures, non-primitives (Objects eg. grouped data) = Reference Data types

- **Mutable:**
    - Reference objects are mutable, meaning their properties and values can be changed after they are created.
    - This is because you are working with a reference to the same object in memory.
    - We reference them, so they are not directly stored in the memory as primitives (value types)
    - objects are stored and copied “by reference”

> All other complex data types are objects, even arrays, but let's go through them separately:

- Commonly OBJECTS are stored within ARRAYS:

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

- In general:

        let arr = ['index0', 'index1', 'index2']        //COMMA to be used to separate items!
        console.log(arr)

- Access date inside:

        **Arrays have keys too, like objects, but those are not visible. They are the index numbers.

        arr[1]                      //Returns 2nd item in array with index1
        arr[1] = "NewValue"         //Updates array item's value with index [1]

        If the list consists of objects within, we can combine the access methods:
            
        arrayName[2].name           //this will refer to the item with index 2, which should be an object, then reach into that object's key called "name", and refer to its value


- Common Functions:

        arr.length                      //the items within the array
        arr.length-1                    //the last item's index number

        arr.push('item1')               //add item to end
        arr.pop()                       //remove item from end
        arr.shift('item3')              //add item to start
        arr.unshift()                   //remove item from start

        (...arr)                        //spread operator or syntax - creates a set of values from an array (useful with Math.min/max for example)

- Shallow vs Deep copy:
    - Deep copy/Structured copy is when you create a copy of an array for example, and making modifications on the new array doesn't affect the original array.
    - **Shallow copy** example:

            let nums1 = [1, 2, 3, 4];
            let nums2 = nums1;      //We ar only creating a new variable with the same reference as nums1's content

            nums2.push(5);         //Will do the operation on the original content of the reference

            console.log(nums1)      // [1, 2, 3, 4, 5]
            console.log(nums2)      // [1, 2, 3, 4, 5]

    - **Deep copy** example:

            const nums = [1, 2, 3, 4];
            const nums2 = [...nums]  //Spread syntax creates deep copies of arrays, if all elements are primitives

            //Best way:
            const deepCopy = JSON.parse(JSON.stringify(original));

            //Or:
            let deepCopy = structuredClone(original);


#### 2. Objects

- In general:

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

- Access data inside:

        person.Key1 -> This will refer to 'value1'      //DOT NOTATION -> You enter into the data of person object with the dot .
        person["Key1"]                                  //Same thing, just with [] brackets. "" is also needed to refer to the key (Keys are actually strings within
                                                            an object, but variable names are not strings) - THIS IS IMPORTANT WHEN USING THE KEY VALUE IN A FUNCTION AS PARAMETER!
        person.Key2 -> This will refer to 42

        console.log(person.attribute1)                  //prints value1
        console.log(person.newObject.newObjAttr1)       //prints value3
        person.myFunction('TEST1', person.attribute2)   //executes object's function

        person1.Key2 = 36                               //Assign new value to existing key

- An object doesn't have a length property, but you can determine it this way:

        Object.keys(myObj).length                       //creates an array from the object's keys, which can be counted

# Variables & Constants

        let myName          //Define a variable with no value (empty variable)
        myName = "Gabor"    //After it was declared with the let keyword, we can assign a value to it with = (This time let keyword is not there anymore!)
        myName = "Koni"     //After the value had already a value, we can modify it (reassign value)

        var a = 'This is a variable'        //old way
        let b = 'This is a variable';
        const c = 'This is a constant';     //a constant's value can't be updated later, but if it's and object, its attributes can be modified

        let variable = Value1 || Value2     //if Value1 is truthy, it will be the variable's value, otherwise it will be Value2

> Depending on what you write after *let nameOfVariable = *, you can define it's data type ( {} for OBJECTS, [] for ARRAYS, "" for STRINGS, or just NUMBERS )

### Naming:     
- Start with `a-z`, `_`, `$`
- Include also numbers and `A-Z`
- No spaces within name
- Try to use decriptive names with ***camelCase:*** eg. `let myPersonalDetails`
- Case insensitive, so `myNAME != myName`
    
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

        +       Works also with strings (old way of doing concatenation), and variables that are numbers (eg. let number = 10, number + 1 = 11)
        -       Substraction
        *       Multiplication
        /       Division
        **      Exponential
        %       Modulo/modulus - returns the 'leftover' or 'remainder' value after a division (eg. 14 % 5 = 4)

### 2. Assignment operators:
    
        =       Assigns or reassigns a value to an item or variable
        +=      i = i + x is the same as i += x                             //To be used only with VARIABLES!
        -=      i = i - x
        *=      i = i * x
        /=      i = i / x
    
        i++     i = i + 1 | Increment - Add 1 to the current value of the variable 'i' ('i' needs to be declared first)        //To be used only with VARIABLES!
        i--     i = i - 1 | Decrement - Substract 1 of current value                                                           

### 3. Comparison operators:

- Equality operators:

        ==      equal to                    //These return boolean values
        !=      not equal to
        ===     stricklty equal to          
        !==     stricktly not equal to

> Comparing **OBJECTS** or **ARRAYS** won't return `true` even if they consist of the same, because they are different objects with the same value:
>>
>>        let a = {age:18};
>>        let b = {age: 18};
>>
>>        a === b will be false 
>>
> But if we compare the **properties** inside, they will be true:
>>        
>>        a.age === b.age will be true

- Mathematiocal operators for numbers only:

        >       greater than                
        <       less than
        >=      greter or equal to
        <=      less than or equal to

### 4. Logical operators (By hierarchy/precedence):

        !   NOT     Inverts true or false values
        &&  AND     If all values are true, it returns true
        ||  OR      If at least one value is true, it returns true

### 5. Conditional operators:

        ?:      BOOLEAN ? "valueIfTrue" : "ValueIfFalse"        //This is the TERNARY operator, same as an IF-ELSE statement
        SWITCH statement

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
  
# Conditional statements: 
- **If-else statement** (Remember to use `else if` between the conditions, not `if else`!)
           
        if (cond){
            CODE IF TRUE;
        } else if (cond2) {
            CODE IF ELSE IS TRUE;
        } else {
            CODE IF ALL BEFORE ARE FALSE;
        }
    - Alternative way: *(=Ternary operator)*

            CONDITION ? ValueIfTrue : ValueIfFalse;
            eg: 4 !== 5 ? "Yes" : "No";

- **Switch statement:**
    - Replaces multiple `if` checks
    - It has multiple `case` blocks and an optional default value:
            
            switch(x) {
                case 'value1':  // if (x === 'value1')
                    ...
                    [break]     // very importan to break every case, otherwise all the cases will
                                // executed after the first true case!

                case 'value2':  // if (x === 'value2')
                    ...
                    [break]

                default:
                    ...
                    [break]
            }

            // grouping cases:

            switch(x) {
                case 'value1':  // if (x === 'value1')
                    ...
                    [break]     // very importan to break every case, otherwise all the cases will
                                // executed after the first true case!
                case 'value2':  
                case 'value3':  // if (x === 'value2' || x === 'value3') //'value2' doesn't have a break, so it will be executed as 'value3'
                    ...
                    [break]
            }


            // use it with prompt:

            let x = prompt("Enter a value"); //the value you enter will be the case number that gets executed
            
            switch(x) {
                case 'value1':
                case 'value2':...
            }
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

#### - **For..of loop** (Used to iterate through items in an iterable object (eg arrays)):

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

#### - **For...in loop:** (Used to iterate through the enumberable values of an uniterable object (eg. objects))

            Same as for of, but it's used to iterate over keys of an Object instead:

            Iterate through keys:

                let myObject = {key1: "value1", key2: "value2", key3: "value3};
                for (const key in myObject){
                    console.log(key);           //will print "key1", "key2", "key3"
                }

            Iterate through key's values:

                for (const key in myObject){
                    console.log(myobject[key]); //Will print "value1", "value2", "value3"
                }

#### - **While loop:**

            let i = 0;                      //the variable is created outside the while loop
            while(i <= 10) {                //while loop only has 1 condition
                console.log(i);             //code that runs in the loop (it will print numbers from 0 to 10)
                i++;                        //add 1 to iteration number
            }

#### - **Do-while loop**
            
                Do-while loops are used when the first iteration is always wanted to be executed, even if the first condition is not true

> #### **BREAK** to be used with loops when you want the code to *stop immediately*
> #### **CONTINUE** to be used to *break current iteration* and move to the next one (so the rest of the code doesn't run for the current one)

# Functions

> A reusable block of code  
> Every function will essentially be a value (what it returns when called)

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
- **Interaction inputs:**
    - `alert`
        - displays elements in the **modal window**
        - shows a message, and waits for User/visitor to press 'ok':
                alert("Click OK to continue!");
    - `prompt`
        - It shows a **modal window** with a text message, an input field for the User/visitor, and the buttons OK/Cancel.
                result = prompt(title, [default]);

                // title: the text to show the user
                // default: Optional parameter, the initial value of the input field

        - User/visitor can type something in the *prompt input field* and press OK -> it becomes *result*
        - Cancel input by pressing `Esc` -> result becomes `null`
        - Example:
                let age = prompt("How old are you?", 30);   //A window pops up asking you "how old are you?" (pre-filled with 30)
                alert(`You are ${age} years old!`);         //Displays your input, or 30, or null if you pressed Esc during the question

        - Colouring (using ANSI excape codes):
            - You can set colurs in the terminal in the following way:
                    "\x1b[31m"      // sets the text color to red. (eg. "\x1b[31mThis text will be red!"])
                    "\x1b[32m"      // sets the text color to green.
                    "\x1b[33m"      // sets the text color to yellow.
                    "\x1b[34m"      // sets the text color to blue.
                    "\x1b[0m"       // resets the text color back to the default.
            - You can set different backgrounds:
                    "\x1b[41m"      // sets the background color to red.
                    "\x1b[42m"      // sets the background color to green.
                    "\x1b[43m"      // sets the background color to yellow.
                    "\x1b[37m"      // sets the text color to white (you can change this to other text colors as needed).
                    "\x1b[30m"      // sets the text color to black.
                    "\x1b[34m"      // sets the text color to blue.
                    "\x1b[0m"       // resets both text and background colors back to the default.
    - `confirm`
        - The function confirm shows a modal window with a question and two buttons: OK and Cancel.
        - The result is `true` if OK is pressed and `false` otherwise.
        - Example:
                let isBoss = confirm("Are you the boss?");
                alert( isBoss ); // true if OK is pressed / false if you press cancel

- **Global and Local scope overview:**

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
    
    - callback() parameters:

        - **CREATION of 1st** 
                
                function func1(callback, parX){                             //NO PARENTHESES!
                    callback(parX)  // or // callback("fixed value");       //YES PARENTHESES! arguments are added here
                }

        - **CREATION of CALLBACK**
        
                function func2(par1){};

        - **CALLING of func1**

                func1(func2, arg1) // or // func1(func2)                    //NO PARENTHESES when called as an argument!
    
    - rest parameters:

        - when we want to keep the possibility of adding multiple arguments to our function, we can use this when we create the function:

                function add(...pars){              //rest parameters operator must be the last one!
                    let result = 0;
                    for (let par of pars){
                        pars += par;
                    };
                };

                add(1, 2, 5, 7);                    //Both calls will be valid, regardless of how many arguments we call it with
                add(12, 23);



### Output - `return` vs. `console.log()`:

- `return` is used to return a value from a function (exit point), while `console.log()` is used to log data in the console (not function related also):

        function funcName(par1, par2) {     
            return "Return value";          //RETURN keyword is used to return values from the LOCAL SCOPE of the function to the GLOBAL SCOPE. It doesn't print it by default!!!
        }                                     Every function returns a value, even if the return keyword is not used. The default return value is *undefined*

        console.log(funcName(arg1, arg2));  //The return value only gets displayed once it is called with the console log function.

        **return default is undefined, so even if a function does something (eg. prints something), but the return keyword is not used, it's value will be undefined

# JS file reading process / code execution
- **Sytax parser:** pre-reads the whole code character by character, and check if the **grammar** is valid (SyntaxError can happen at this stage)
    - memory space is created for each variable, and `undefined` value gets assigned to variables (but functions don't get a temporary value!) - this is what actually hoisting is, not "lifiting parts of code above the rest"
- **Lexical scope/environment:** an environment, where a piece of the entire code physically sits
    - Global scope = window object
    - Block scope = eg. within a function
    - Local scope = the current scope we are in
    - **Scope chain:**
        - It means that a variable/function created in a bedded block scope is only accessible from the inside, but not from Global level
        - The other way around it works, so you can reach Global variables/functions from your local scope
        - Also, if a value is declared on both global scope, and a level further out on another block scope, the current block scope will try to find a variable in the following order:
            - First it checks if the variable is in it's own local scope
            - Then moves 1 scope up: if it finds it, it reads it's value from there
            - If it's still not found, it keeps going up (until it reaches global scope)
- **Execution context:** container, which manages the code that is currently running
    - 2 stages:
        - Creation Stage
            - Global execution context:
                - Creates **Global Object** and `this` (equal to *global object* on *global level*):
                    - This is the **Window Object**, that represents an open window in a web browser
                    - Any variable/function we create in .js files and is read from the HTML file, gets added to this object as a key:

                            let testVar = "value";
                            function testFunc(){return null};

                            In DOM:
                            testVar -> "value" is returned
                            window.testVar -> "value" is returned
                            this.testVar -> "value" is returned

                            testFunc()
                            window.tesFunc()
                            this.testFunc() -> these will also refer to the same thing

            - on page load, it manages all code that is not inside a function
            - **Syntax parser** runs (before execution still! values of *variables* is `undefined`)
        - Execution Stage:
            - Execute code line by line
            - Values get assigned
            - Local scope code gets executed (only true parts of if statements!)
- Order of execution:
    - **Execution stack:**
        - At first, **Global Execution Context** get executed -> `window` & `this` object
        - Sytax parser runs
        - Engine starts running line-by-line, L to R
        - **Execution context** is created for each called function and bedded funtions within
            - Maximum call stack size: there is a limit for how many levels it can get into!
- **Hoisting:**

    > *Hoisting is a JavaScript behavior where variable and function declarations</br>
    > are moved to the top of their containing scope during the compilation phase.</br>
    > This means that you can use variables and functions before they are declared in your code*

    - **hositing** means *raising* something above (pre-execute). So it's processed at the start of execution:
        - This is done for variable and function **DECLARATIONS**, but not for their values **ASSIGNMENTS**
        - So after the hoisting phase, these will have an *undefined* value
    - Declarations are hoisted, but assignments are not:
        - The line `var phrase = "Hello"` has two actions in it:

            - Variable *declaration* `var`
            - Variable *assignment* `=`
    - 
- `this` keyword:
    - refers to Global window object (even from inside declared functions, and even if it's a bedded function in another function)
    - we change the referenc to local object, if we store a function as a **method** (inside the key of an object):

            let person = {
                firstname: "John",
                lastname: "Smith",
                getFullname: function(){
                    return t his.firstname + " " + this.lastname;            //in this case it "this" refers to "person" object
                }
            }
    - Note:
        If we declare a regular function **within a method**, `this` will still refer to **global window object**!!! It doesnt' matter if it's enbedded into a method already

# Builtin features

> ### **Method**  
> A function that is associated with an object or an instance of an object, typically used to perform operations on the object or manipulate the object's data.
>> **Essentially it's a function stored in an object's key as a value.**
> They are basically functions defined as values of an object's key.

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

- Call them with a parameter:

        let favoriteBook = {
            title: "Artemis",
            author: "Andy Weir",
            year: 2017,
            age: function(currentYear){
                return currentYear - favoriteBook.year;
            };
        };

        favoritebook.age(2023)      //and also use console.log if you want to log it

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

    - It allows you to iterate over each element in an array and perform a specific action *(callback function)* for each element.
    - Here's how it works:

            myarray.forEach(function(currentValue, index, array) {
                // Your code here
            });

            myarray:        The array you want to iterate over.
            currentValue:   The current element being processed in the array.
            index:          The index of the current element.
            array:          The array that forEach() is being applied to.
    
    - Here's an example with only 1 parameter:

                const names = ["Alice", "Bob", "Charlie", "David"];

            Create a new array with names followed by an exclamation mark
            
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

                colors.forEach(function(currentColor, index, colorArray) {                              //Here 3 parameters are added to the function. colorArray refers to original colors array
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

# Date constructor:

- **Timestamp number / Time value:** an integer number representing the time in milliseconds since *January 1, 1970, UTC, 00:00:00 AM*
- **Date string:** A string value representing a date parsed/interpreted using the same algorithm as `new Date.parse()`:

### Create a date
1. No parameters:

        let newDate = new Date();                               //Will generate current date in this format (creates a timestamp):
                                                                  Tue Sep 12 2023 14:08:57 GMT+0200 (Central European Summer Time)

        Same as:
        let newDate = new Date.now();

2. Use milliseconds:

        let startingDate = new Date(0);                         //Thu Jan 01 1970 01:00:00 GMT+0100 (Central European Standard Time)
        let startingDate = new Date(1000 * 60 * 60 * 24);       //Thu Jan 02 1970 01:00:00 GMT+0100 (Central European Standard Time)

        Convert a Date object to a timestamp using date.getTime():

3. Use a timestring:

        let date = new Date("2017-01-26");                      //This time is not set, so it can be any hour, in any timezone!
        
        or 

        let ms = Date.parse('2012-01-26T13:51:50.417-07:00');   //The number of milliseconds since 1970-01-01
        let date = new Date(ms)                                 //Recreate Date object

        The string format should be: YYYY-MM-DDTHH:mm:ss.sssZ, where:

        YYYY-MM-DD – is the date: year-month-day.
        The character "T" is used as the delimiter.
        HH:mm:ss.sss – is the time: hours, minutes, seconds and milliseconds.
        The optional 'Z' part denotes the time zone in the format +-hh:mm. A single letter Z would mean UTC+0.
        
        Shorter variants are also possible, like YYYY-MM-DD or YYYY-MM or even YYYY.

4. Use components:

        let date = new Date(year, month, date, hours, minutes, seconds, ms)

        let date = new Date(2023, 1, 21)                        //only first 2 are mandatory
                                                                //months start with index 0! (so 1 will be February)

### Access components

- To access specific data from a `Date` object:

        new Date().getFullYear();                               //Get year in YYYY format (NOT getYear!!!)
        new Date().getMonth();                                  //Get month in M format (0 to 11!!!)
        new Date().getDate();                                   //Get days in D or DD format

        getHours()/getMinutes()/getSeconds()/getMilliseconds()...

        new Date().getDay();                                    //Get days of the week: 0 is Sunday... 6 is Saturday

        new Date().getTime();                                   //Get time in milliseconds
        new Date().getTimezoneOffset();                         //Get time difference from your local timezone and UTC in MINUTES!!!

### Set date components

- Use it to reset some values in a date created, eg:

        let today = new Date();

        today.setHours(0);
        console.log(today); // still today, but the hour is changed to 0

- These are the methods:

        setFullYear(year, [month], [date])
        setMonth(month, [date])
        setDate(date)
        setHours(hour, [min], [sec], [ms])
        setMinutes(min, [sec], [ms])
        setSeconds(sec, [ms])
        setMilliseconds(ms)
        setTime(milliseconds) (sets the whole date by milliseconds since 01.01.1970 UTC)

        Every one of them except setTime() has a UTC-variant, for instance: setUTCHours()

- A common use is the combination of **set** and **get**:

        let date = new Date();
        date.setSeconds(date.getSeconds() + 70);                //Set(!) the time to 70 seconds after current time (Get(!))

- If we add days to a date, it **autocorrects** it to an existing date:

        let date = new Date(2016, 1, 28);
        date.setDate(date.getDate() + 2);                       //+2 days are added to 28 Feb, it recognizes it and updates month as well

- Add/subtract dates:

        First, create a timestamp from the date:

        let date = new Date().getTime();                        //Converts current date to a millisecond based timestamp
        let date = Date.now();                                  //Same as above, but there is no Date object created (=faster)

# SET Object:
- `Set` is a default object in JS, which is the collection of different unique values (a simpler type of the Map object - see below)
    - We can declare it like this:
            const mySet = new Set();
            const mySet = new Set([array])     //we can instantly create a set from an array, to skip duplicates
    - We can add & remove items:
            mySet.add("a");
            mySet.delete("b");
    - Check if a value is included already:
            mySet.has("c");
    - Check number of values (=length of Set):
            mySet.size
    - Convert to array:
            let arrMySet = Array.from(mySet);
            let arrMySet = [...mySet];
    - We can use Object.keys/values/entries as well:
            mySet.keys() & mySet.values     //they are the same thing in this case
            mySet.values                    //an array for each key-value pair, which are the same
- We can also use `for...of` loops or `forEach()` method on it to iterate through all of it's values

# MAP Object:

- Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type.
- Unlike objects, keys are not converted to strings. Any type of key is possible!
- Methods and properties are:

        new Map() – creates the map.
        map.set(key, value) – stores the value by the key.
        map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
        map.has(key) – returns true if the key exists, false otherwise.
        map.delete(key) – removes the element (the key/value pair) by the key.
        map.clear() – removes everything from the map.
        map.size – returns the current element count.

- Simple example:

        let map = new Map();

        map.set('1', 'str1');           // a string key
        map.set(1, 'num1');             // a numeric key
        map.set(true, 'bool1');         // a boolean key

        // Same as this:
        let map = new Map([
            ['1',  'str1'],
            [1,    'num1'],
            [true, 'bool1']
        ]);

        // Access them: (Map keeps the type, so these 2 are different!)
        map.get(1);                     // 'num1'
        map.get('1');                   // 'str1'

- Keys as objects example:

        let john = { name: "John" };
        let ben = { name: "Ben" };

        // for every user, let's store their visits count
        let visitsCountMap = new Map();

        // john is the key for the map
        visitsCountMap.set(john, 123);
        visitsCountMap.set(ben, 14);

        console.log(visitsCountMap.get(john));      // 123
        console.log(visitsCountMap.get(ben));       // 14

- We can create a map from an object like this:

        let obj = {
            name: "John",
            age: 30
        };

        let map = new Map(Object.entries(obj));     // Object.entries returns the array of key/value pairs: [ ["name","John"], ["age", 30] ]. That’s what Map needs.

        alert( map.get('name') ); // John

        // The opposite: Object from Map:
        let prices = Object.fromEntries([
            ['banana', 1],
            ['orange', 2],
            ['meat', 4]
        ]);

- Every map.set call returns the map itself, so we can “chain” the calls:

        map.set('1', 'str1')
           .set(1, 'num1')
           .set(true, 'bool1');

- For looping over a map, there are 3 methods: (Map preserves order, unlike a regular Object)

        map.keys() – returns an iterable for keys,
        map.values() – returns an iterable for values,
        map.entries() – returns an iterable for entries [key, value], it’s used by default in for..of.

        // Example:
        let recipeMap = new Map([
            ['cucumber', 500],
            ['tomatoes', 350],
            ['onion',    50]
        ]);

        // iterate over keys (vegetables)
        for (let vegetable of recipeMap.keys()) {
            alert(vegetable); // cucumber, tomatoes, onion
        }

        // iterate over values (amounts)
        for (let amount of recipeMap.values()) {
            alert(amount); // 500, 350, 50
        }

        // iterate over [key, value] entries
        for (let entry of recipeMap) { // the same as of recipeMap.entries()
            alert(entry); // cucumber,500 (and so on)
        }