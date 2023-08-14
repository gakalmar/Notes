DATA TYPES

    PRIMITIVES

        1 String ("string1" or 'string2')

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

        2 Number (integer or float/fraction)

            Integers - whole numbers
        
        3 Boolean (true or false):

            Values for non-booleans (Thruthy - Falsy):          //if we have a constant or variable, and assign a true or false value to it, we also call that truthy and falsy
            
                1           true
                0           false
                "a"         true
                ""          false
                Nan         false
                undefined   false
                null        false
                []          true
                {}          true
            
            Example:

                let name = ``;
                if (name){
                    consoloe.log(`Hello ${name}!`);
                } else {
                    console.log(`There was no name provided.`);
                }

        4 Undefined
        
        5 null

    DATA STRUCUTURES - NOT PRIMITIVES (eg. Objects, Arrays, Properties, Grouped data)

        **Commonly OBJECTS are stored within ARRAYS:

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

        ARRAYS

            let arr = ['index0', 'index1', 'index2']        //COMMA to be used to separate items!
            console.log(arr)

            Access date inside:

                **Arrays have keys too, like objects, but those are not visible. They are the index numbers.

                arr[1]                          //Returns 2nd item in array with index1
                arr[1] = "NewValue"             //Updates array item's value with index [1]

                If the list consists of objects within, we can combine the access methods:
                    
                    arrayName[2].name           //this will refer to the item with index 2, which should be an object, then reach into that object's key called "name", and refer to its value


            Common Functions:

                arr.lenght                      //the items within the array
                arr.length-1                    //the last item's index number

                arr.push('item1')               //add item to end
                arr.pop('item2')                //remove item from end
                arr.shift('item3')              //add item to start
                arr.unshift('item4')            //remove item from start

        OBJECTS

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

VARIABLE, CONSTANT

    let myName          //Define a variable with no value (empty variable)
    myName = "Gabor"    //After it was declared with the let keyword, we can assign a value to it with = (This time let keyword is not there anymore!)
    myName = "Koni"     //After the value had already a value, we can modify it (reassign value)

    var a = 'This is a variable'        //old way
    let b = 'This is a variable';
    const c = 'This is a constant';     //a constant's value can't be updated later, but if it's and object, its attributes can be modified

    **Depending on what you write after *let nameOfVariable = *, you can define it's data type ( {} for OBJECTS, [] for ARRAYS, "" for STRINGS, or just NUMBERS )

    NAMING:     - Start with a-z, _, $
                - Include also numbers and A-Z
                - No spaces within name
                - try to use decriptive names with camelcase: eg. *let myPersonalDetails*
                - case insensitive, so myNAME != myName
    
    Reassigning values with new variables:

        let myName = "Jorge"
        let myNewName = "Denis"
        let myName = myNewName  ->  myName will become "Denis"
                                    myNewName will stay "Denis"
        
        let myAge = 36
        let myNewAge = myAge    ->  This will make myNewAge the value of myAge, which is 36
        myAge = 37              ->  This will update myAge, but not myNewAge
                                    So myAge will be 37 and myNewAge will stay 36


OPERATORS
    
    ARITHMETIC OPERATORS

    +       Works also with strings (old way of doing concatenation), and variables that are numbers (eg. let number = 10, number + 1 = 11)
    -       Substraction
    *       Multiplication
    /       Division

    %       Modulo/modulus - returns the 'leftover' or 'remainder' value after a division (eg. 14 % 5 = 4)
    i++     i = i + 1 | Increment - Add 1 to the current value of the variable 'i' ('i' needs to be declared first)        //To be used only with VARIABLES!
    i--     i = i - 1 | Decrement - Substract 1 of current value                                                           

    ASSIGNMENT OPERATORS
    
    =       Assigns or reassigns a value to an item or variable
    +=      i = i + x is the same as i += x                             //To be used only with VARIABLES!
    -=      i = i - x
    *=      i = i * x
    /=      i = i / x
    
    COMPARISON OPERATORS

    ==      equal to                    //These return boolean values
    !=      not equal to
    ===     stricklty equal to          //Comparing OBJECTS or ARRAYS won't return true even if they consist of the same, because they are different objects with the same value (so let a = {age:18}; b = {age: 18}; a === b will be false). But if we compare the properties inside, they will be true (a.age === b.age will be true)
    !==     stricktly not equal to
    
    >       greater than                //Mathematiocal operators for numbers only
    <       less than
    >=      greter or equal to
    <=      less than or equal to

    LOGICAL OPERATORS (By hierarchy)

    !   NOT     Inverts true or false values
    ||  OR      If at least one value is true, it returns true
    &&  AND     If all values are true, it returns true

    CONDITIONAL OPERATORS

    ?:      BOOLEAN ? "valueIfTrue" : "ValueIfFalse"

    FULL HIERARCHY DESCENDING (also called PRECEDENCE): 
    () . ! ** * / % + - ""+"" < <= === !== && || ?: assignments

CONDITIONAL STATEMENTS
    
    IF-ELSE STATEMENT (Remember to use *else if* between the conditions, not *if else*!)
    
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

    LOOPS

        FOR LOOP (Used when you know the number of repetitions):

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

        FOR...OF LOOP (Used to iterate through items in an Array or Object):

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

        FOr...IN LOOP

            Same as for of, but it's used to iterate over keys of an Object instead:

                let myObject = {key1: "value1", key2: "value2", key3: "value3};
                for (const key in myObject){
                    console.log(key);           //will print "key1", "key2", "key3"
                }

        WHILE LOOP

            let i = 0;                      //the variable is created outside the while loop
            while(i <= 10) {                //while loop only has 1 condition
                console.log(i);             //code that runs in the loop (it will print numbers from 0 to 10)
                i++;                        //add 1 to iteration number
            }

        DO-WHILE LOOPS
            
                Do-while loops are used when the first iteration is always wanted to be executed, even if the first condition is not true

FUNCTIONS

    **A reusable block of code

    WAYS TO DECLARE FUNCTIONS:
        
        REGULAR FUNCTION:

            **They can be used before their declaration.

            function funcName(par1, par2) {     //Define function with FUNCTION keyword instead of LET. Then add the name of the function, and () parenthesis.
                //BODY                          //Inside the () the inputs are called parameters, if there are any.
            }

            funcName();                         //Call a function. Evene when there are no parameters, the () are needed to call the function.
            funcName(arg1, arg2);               //Calls the function with the parameters swapped to the input arguments.

        ANONYMOUS FUNCTION (=FUNCTION EXPRESSION):

            **Just as variables and constants, these can only be called after declaration.

            const varName = function(){         //We can create an anonymous function by storing it in a constant or variable.
                //BODY;                         //Creating it this way we can only call the function AFTER it was created, as opposed to regular creation method
            }

            varName();                          //To call the function, we still need to add the () to the constant's name to call the function.

        ARROW FUNCTION EXPRESSION:

            let funcName = (par1, par2) => {    //function name is declared with let keyword, as variables. But then in () the variables are added, and the ARROW => points to the BODY
                return par1 * par2;
            }

            funcName(arg1, arg2)                //It will be called the same way

            let add = (a, b) => a + b;          //Single line functions have no function keyword, no curly braces {} and no rturn keyword, which makes them very quick to create
            let greet = name => `Hi, ${name}!`  //If there is only one parameter, even the single parenthesis can be left.

    INPUTS:

        SHORT EXPANATION ABOUT GLOBAL AND LOCAL SCOPE:

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

            **So that's why for inputs, we use parameters.
        
        PARAMETERS:

            function funcName(par1, par2 = 'DefaultValue') {        //We can assign a parameter a default value, if it's not called, buy writing it at declaration stage.
                //BODY                                                par1 & par2 are locally created variables, that are only accessible from inside the function (LOCAL SCOPE)
            }

            We can call a function with a variable created on GLOBAL SCOPE too:

                let x = "John";
                
                funcName(x);                                        //It will be the same as calling the function like this: funcName("John");
            
            We can even call functions with parameters, that are other functions (=CALLBACK FUNCTIONS):

                function greet(name, callback) {                    //First, we create a function, and one parameter will be another function
                    console.log(`Ciao, ${name}!`);
                    callback();                                     //We call this other function inside this function here
                }

                function sayGoodbye() {                             //We create the other function
                    console.log("Goodbye!");
                }

                greet("David", sayGoodbye);                         //Call the first function, with the second function as an argument (=callback function)

    OUTPUT - RETURN VS. CONSOLE.LOG():

        function funcName(par1, par2) {     
            return "Return value";          //RETURN keyword is used to return values from the LOCAL SCOPE of the function to the GLOBAL SCOPE. It doesn't print it by default!!!
        }                                     Every function returns a value, even if the return keyword is not used. The default return value is *undefined*

        console.log(funcName(arg1, arg2));  //The return value only gets displayed once it is called with the console log function.

        **return default is undefuned, so even if a function does something (eg. prints something), but the return keyword is not used, it's value will be undefined




