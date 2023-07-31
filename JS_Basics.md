DATA TYPES

    PRIMITIVES

        String ("string1" or 'string2')

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

        Number (integer or float/fraction)

            Integer - whole numbers
        
        Boolean (true or false)
            Values for non-booleans:
                1           true
                0           false
                "a"         true
                ""          false
                Nan         false
                undefined   false
                Null        false

        Undefined
        
        Null

    DATA STRUCUTURES - NOT PRIMITIVES (eg. Arrays, Properties, Grouped data)

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
                person["Key1"]                                  //Same thing, just with [] brackets. "" is also needed to refer to the key (Keys are actually strings within an object, but variable names are not strings)
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
        myAge = 37              ->  This will update myAge, but not myNewAge!


ARITHMETIC OPERATORS

    +   works also with strings (old way of doing it), and variables that are numbers (eg. let number = 10, number + 1 = 11)
    -
    *
    /
    %   modulo - returns the 'leftover' value after a division (eg. 14 % 5 = 4)

    == equal to
    != not equal to
    === stricklty equal to
    !== stricktly not equal to
    > greater than
    < less than
    >= greter or equal to
    <= less than or equal to

LOGICAL OPERATORS (By hierarchy)

    !   NOT     Inverts true or false values
    ||  OR      If at least one value is true, it returns true
    &&  AND     If all values are true, it returns true

CONDITIONAL STATEMENTS
    
    IF STATEMENT
    
        if (cond){
            CODE IF TRUE;
        } else if (cond2) {
            CODE IF ELSE IS TRUE;
        } else {
            CODE IF ALL BEFORE ARE FALSE;
        }

        Alternative way:
        CONDITION ? ValueIfTrue : ValueIfFalse;
        eg: x == 5 ? Yes : No;

    LOOPS

        FOR LOOP

            arr = ['item1', 'item2', 'item3', 'item4', 'item5']         //this is just an array with 5 elements for better understanding
            for(let i = 0; i < arrLoop.length; i++) {                   //let i = 0 means i variable's initial value is 0" // i < 5 means until when should it be repeated // i++ means that 1 should be added to 'i' after each step
                console.log(arr[i]);                                    //print arr[0] then arr[1] ... until it reaches limit
            }

                // break to be used in for loops when you want the code to stop immediately
                // continue to be used to break current iteration, and moves to the next iteration, so the rest of the code doesn't run for the current one

        WHILE LOOP

            let i = 0;                      //the variable is created outside the while loop
            while(i <= 10) {                //while loop only has 1 condition
                console.log(i);             //code that runs in the loop (it will print numbers from 0 to 10)
                i++;                        //add 1 to iteration number
            }

        DO-WHILE LOOPS
            
                Do-while loops are used when the first iteration is always wanted to be executed, even if the first condition is not true

FUNCTIONS

    function funcName(par1, par2) {         //Declare function (=create)
        //CODE
    }

    funcName(arg1, arg2)                    //calls the function with the parameters swapped to the input argumetns

RETURN VS. CONSOLE.LOG()



