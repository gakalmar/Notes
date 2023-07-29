DATA TYPES

    String ("string1" or 'string2')

    Number (integer or float)
    
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

ARITHMETIC OPERATORS
    +   works also with strings
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

CONDITIONAL STATEMENTS

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

LOGICAL OPERATORS (By hierarchy)

    !   NOT     Inverts true or false values
    ||  OR      If at least one value is true, it returns true
    &&  AND     If all values are true, it returns true

VARIABLE, CONSTANT

    var a = 'This is a variable' //old way(?)
    let b = 'This is a variable';
    const c + 'This is a constant';

FUNCTIONS


    function funcName(par1, par2) {         //Declare function (=create)
        //CODE
    }

    funcName(arg1, arg2)                    //calls the function with the parameters swapped to the input argumetns

RETURN VS. CONSOLE.LOG()

ARRAYS

    let arr = ['index0', 'index1', 'index2']
    console.log(arr)

    arr.push('item1')           //add item to end
    arr.pop('item2')            //remove item from end
    arr.shift('item3')          //add item to start
    arr.unshift('item4')        //remove item from start
    arr[1]                      //returns 2nd item in array with index1

    console.log(arr)


OBJECTS

    let person = {
        attribute1: 'value1',
        attribute2: 'value2',
        newObject: {
            newObjAttr1: 'value3',
            newObjAttr2: 'value4'
        },
        myFunction: function(var1, var2) {
        console.log('First variable is : ' + var1 + '\n' + 'Second variable is: ' + var2)
        }
    }

    console.log(person.attribute1)                  //prints value1
    console.log(person.newObject.newObjAttr1)       //prints value3
    person.myFunction('TEST1', person.attribute2)   //executes object's function


LOOPS

    arr = ['item1', 'item2', 'item3', 'item4', 'item5']         //this is just an array with 5 elements for better understanding
    for(let i = 0; i < arrLoop.length; i++) {                   //let i = 0 means i variable's initial value is 0" // i < 5 means until when should it be repeated // i++ means that 1 should be added to 'i' after each step
        console.log(arr[i]);                                    //print arr[0] then arr[1] ... until it reaches limit
    }

        // break to be used in for loops when you want the code to stop immediately
        // continue to be used to break current iteration, and moves to the next iteration, so the rest of the code doesn't run for the current one

    let i = 0;                      //the variable is created outside the while loop
    while(i <= 10) {                //while loop only has 1 condition
        console.log(i);             //code that runs in the loop (it will print numbers from 0 to 10)
        i++;                        //add 1 to iteration number
    }

        //do-while loops are used when the first iteration is always wanted to be executed, even if the first condition is not true
