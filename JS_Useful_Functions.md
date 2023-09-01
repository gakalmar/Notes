# General:

typeof === value instanceof Array                       //Check the type of the data
                            String
                            Integer(?)

Number.isInteger(value)                                 //Chheck if the value is an integer (value % 1 === 0 should also do the same!)

# Strings: 
*Strings are immutable, so these methods will return new strings instead of modifying the original ones.*

    '${something}'                                      //creates a pocket for 'something' that displays as a string

    string.toUpperCase()                                //returns a string with UPPERCASE
    string.toLowerCase()                                //returns a string with lowercase

    string.length                                       //returns the length of a string (or array)
    string.concat(str1, " ", str2)                      //combines 2 or more strings into a single string

    string.indexOf("char1")                             //returns the index value of first char1 in string
    string.lastIndexOf("char1")                         //returns the index value of last char1 in string
    string.charAt(index)                                //returns the character at a specific index number

    string.split("")                                    //splits the string into an array of it's letters
    string.split("splitteritem") eg. ", "               //splits the string into an array creating a new item at every "splitteritem"
    string.split("x").lenght                            //use this to count the number of 'x' items in the string

    string.slice(firstindex, lastindex)                 //returns the string from first index to last index

    string.StartsWith("strTest")                        //returns true if "string" starts with "strTest"
    string.EndsWith("strTest")                          //returns true if "string" ends with "strTest"

    array.join("")                                      //joins the elements of an array into a string

    string.replace("what", "withwhat")                  //replaces characters in a string with another string (STINGS ONLY!). It doesn't modify the original, so to update it you need to use str = str.replace(a, b)
    string.replace(/a/gi, "")                           //writing it this way, /g refers to all occurencies, not just the first one. Adding the i makes it case insensitive
    string.replace(/[aeiou]/gi, "")                     //this is an advanced way to write it (/ refers to a global expression, [aeiou] refers to a character class and the letters to look for inside it). g means all occurrencies, i means case insensitive search
    string.trim()                                       //removes whitespace from end and beginning of a string

### Additional ones from Journey course:

    charAt(index)                                       //Returns the character at the specified index within the string.
    charCodeAt(index)                                   //Returns the Unicode of the character at the specified index.
    concat(str1, str2, ...)                             //Combines two or more strings into one new string.
    indexOf(searchValue[, startIndex])                  //Returns the first index at which the specified value is found, or -1 if it is not found.
    lastIndexOf(searchValue[, startIndex])              //Returns the last index at which the specified value is found, or -1 if it is not found.
    slice(beginIndex[, endIndex])                       //Extracts a portion of a string and returns it as a new string.
    substring(startIndex[, endIndex])                   //Returns the characters between two indexes in a string.
    substr(start[, length])                             //Returns a substring beginning at a specified index for a given number of characters.
    split([separator[, limit]])                         //Splits a string into an array of substrings using the specified separator.
    replace(searchValue, replaceValue)                  //Replaces the first occurrence of a specified value with a new value.
    replaceAll(searchValue, replaceValue)               //Replaces all occurrences of a specified value with a new value.
    search(regexp)                                      //Searches a string for a specified value (regular expression) and returns the index of the match or -1 if not found.
    match(regexp)                                       //Searches for a match in a string against a regular expression and returns an array of matched substrings, or null if no match is found.
    matchAll(regexp)                                    //Returns an iterator that yields all matches of a regular expression in a string.
    toLowerCase()                                       //Converts all characters in a string to lowercase.
    toUpperCase()                                       //Converts all characters in a string to uppercase.
    trim()                                              //Removes whitespace from both ends of a string.
    trimStart()                                         //Removes whitespace from the beginning of a string.
    trimEnd()                                           //Removes whitespace from the end of a string.
    startsWith(searchValue[, startIndex])               //Determines if a string starts with the specified value, optionally at a specified index.
    endsWith(searchValue[, length])                     //Determines if a string ends with the specified value, optionally considering a specified length.
    includes(searchValue[, startIndex])                 //Determines if a string contains the specified value, optionally starting from a specified index.
    arr.includes(searchValue)                           //See if an array or string includes searchValue.
    arr.includes(searchValue, startindex)               //Second parameter specifies the first element of the array where the search should begin.
    repeat(count)                                       //Creates a new string by concatenating the original string a specified number of times.

# Numbers:

    Math.max(...arrayOfNumbers) or                      //returns max or min values of an array
        Math.max(1, 2, 3)
    Math.min(...arrayOfNumbers) or
        Math.min(1, 2, 3)
    Math.Pi                                             //Refers to 3.1415...
    Marh.floor(fractionalNumber)                        //Returns the whole values of a number rounded down (integer from float)
    Marh.ceil(fractionalNumber)                         //Returns the whole values of a number rounded up (integer from float)

    parseInt("42")                                      //converts a string into an integer
    parseFloat("42.184923")                             //converts a string into a float
    42.toString()                                       //converts a number into a string
    String(42)                                          //converts a number into a string (easier to remember way)

### Additional ones from Journey course:

    parseInt(string, radix)                             //Converts a string to an integer, using the specified radix (base) for the conversion.
    parseFloat(string)                                  //Converts a string to a floating-point number.
    Number(value)                                       //Converts a value to a number, if possible.
    isNaN(value)                                        //Determines if the provided value is NaN (Not-a-Number).
    isFinite(value)                                     //Determines if the provided value is a finite number.
    Math.round(value)                                   //Rounds a number to the nearest integer.
    Math.floor(value)                                   //Rounds a number down to the nearest integer.
    Math.ceil(value)                                    //Rounds a number up to the nearest integer.
    Math.trunc(value)                                   //Truncates the fractional part of a number, leaving the integer part.
    Math.abs(value)                                     //Returns the absolute value of a number.
    Math.min(a, b, ...)                                 //Returns the smallest number from a set of one or more numbers.
    Math.max(a, b, ...)                                 //Returns the largest number from a set of one or more numbers.
    Math.pow(base, exponent)                            //Calculates the base raised to the power of the exponent.
    Math.sqrt(value)                                    //Calculates the square root of a number.
    Math.cbrt(value)                                    //Calculates the cube root of a number.
    Math.sin(value)                                     //Calculates the sine of an angle in radians.
    Math.cos(value)                                     //Calculates the cosine of an angle in radians.
    Math.tan(value)                                     //Calculates the tangent of an angle in radians.
    Math.asin(value)                                    //Calculates the arcsine of a value, returning the angle in radians.
    Math.acos(value)                                    //Calculates the arccosine of a value, returning the angle in radians.
    Math.atan(value)                                    //Calculates the arctangent of a value, returning the angle in radians.
    Math.atan2(y, x)                                    //Calculates the arctangent of y/x, returning the angle in radians.
    Math.log(value)                                     //Calculates the natural logarithm of a value.
    Math.exp(value)                                     //Calculates the base of the natural logarithm (e) raised to the power of the provided value.
    Math.random()                                       //Generates a random floating-point number between 0 (inclusive) and 1 (exclusive).

# Arrays:

    map, filter, find

    array.push('item1')                                 //add item to end of array THESE OPERATIONS MODIFY THE ORIGINAL!!! Create a copy of your arraw before doing any manipulation.
    array.pop()                                         //remove item from end. They can't be put in chain either, as the operation doesn't return a new array, but instead the removed item
    array.unshift('item2')                              //add item to start
    array.shift()                                       //remove item from start
    
    array[1]                                            //returns 2nd item in array with index1
    array.splice(index1, number)                        //removes the number of items from index1

    array.reverse()                                     //reverses array order in place (it changes the original too!)

    array.slice(firstindex, lastindex)                  //returns the array from first index to last index (no value means from start or to end)
                                                        firstindex - IS included
                                                        lastindex - ISN'T included (leave it empty if you want to list the items to the last item)

    array.map()                                         //creates a new array by applying a function to each element of an existing array.
    array.filter(condition)                             //creates a new array with elements that pass a specific condition
                                                        //condition example: (elementInArray => elementInArray.length > 4)

    array.includes(searchValue)                         //See if an array or string includes searchValue.
    array.includes(searchValue, startindex)             //Second parameter specifies the first element of the array where the search should begin.
 
### Additional ones from Journey course:

    push(element1, ..., elementN):                      //Adds new elements to the end of an array and returns the new length of the array.
    pop():                                              //Removes the last element from an array and returns that element.
    shift():                                            //Removes the first element from an array and returns that element.
    unshift(element1, ..., elementN)                    //Adds new elements to the beginning of an array and returns the new length of the array.
    splice(start[, deleteCount[, item1[, item2[, ...]]]])   //Adds/removes elements from an array and returns the removed elements, if any.
    slice(beginIndex[, endIndex])                       //Returns a shallow copy of a portion of an array into a new array.
    concat(array2[, array3, ..., arrayN])               //Merges two or more arrays into a new array.
    indexOf(searchElement[, fromIndex])                 //Returns the first index at which the specified element is found, or -1 if it is not found.
    lastIndexOf(searchElement[, fromIndex])             //Returns the last index at which the specified element is found, or -1 if it is not found.
    reverse()                                           //Reverses the order of the elements in an array.
    sort([compareFunction])                             //Sorts the elements of an array.
    join([separator])                                   //Joins all elements of an array into a string.

# Objects:

    delete myObject.propertyN;                          //deletes the propertyN of an object   
    Object.keys(obj)                                    //Returns an array of a given object's own enumerable property names.
    Object.values(obj)                                  //Returns an array of a given object's own enumerable property values.
    Object.entries(obj)                                 //Returns an array of a given object's own enumerable property [key, value] pairs.             

# Dates:

    let today = new Date();                             //Gets today's date in this format: "Sat Jul 02 2023 09:30:00 GMT+0530 (India Standard Time)"
    let year = today.getFullYear();                     //Get only 'YYYY' format from previously generated date
    let month = today.getMonth() + 1;                   //Get 'MM' or 'M' - Months are zero-indexed, so we add 1 to get the correct month.
    let day = today.getDate();                          //Get 'DD' or 'D' format of the day
    let todayShort = new Date(`${year}-${month}-${day}`)//To get it in a short version

    let date1 = new Date(todayShort);                   //Calculate AGE (substract 2 dates)
    let date2 = new Date(`1986-10-4`);                  
    let age = (date1 - date2)*1000*60*60*24*365         //Substract 2 dates and multiply the result in millisecs until you get years (use Math.floor() to get whole numbers)

# NextGen functions

    FOR EACH
    arr.forEach(callback[, thisArg])                    //Executes the provided function once for each array element.
    arr.forEach(item => {//dothis//})                   //the default parameters are item - current item; index - it's index; sourcearr - the array it's from
    arr.forEach(callback(item, index, sourcearr))       //the default parameters are item - current item; index - it's index; sourcearr - the array it's from

    MAP
    map(callback[, thisArg])                            //Creates a new array with the results of calling the provided function on every element in the array.
    
    FILTER
    filter(callback[, thisArg])                         //Creates a new array with all elements that pass the test implemented by the provided function.
    
    REDUCE
    reduce(callback[, initialValue])                    //Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
    
    FIND
    find(callback[, thisArg])                           //Returns the value of the first element in the array that satisfies the provided testing function.
    findIndex(callback[, thisArg])                      //Returns the index of the first element in the array that satisfies the provided testing function, or -1 if no element satisfies the test.
    
# Callback builtins

    Object.keys(myObj)                                  //returns the keys of an object inside the parentheses
    Object.values(myObj)                                //returns the values of an object inside the parentheses
    Object.entries(myObj)                               //returns entries (key-value pairs) as an array, each value pair is also an array of 2 elements. [["key1", "value1"], ["key2", "value2"], ["key3", "value3"]]
    
    (number).toString()                                 //converts a string or variable into a number. NOTE the number has to be within parentheses, otherwise it's interpreted as a decimal point
    array.toString()                                    //returns a string in this format "item1,item2,item3"
    
    string.split(", ")                                  //create an array from a string. Opposite of arr.join("")
    string.split(" ", 3)                                //The second parameter show how long the return array should be maximum (3 items)
    
    arr.replace                                         //this doesn't exist, only with strings. Use the index number instead to declara a new value to it (eg arr[0] = "New item" => this will be new 0th item in the array)
    arr.splice(start, end, item1,...itemn)              //remove elements from list from 'start' (included) to 'end'(not included). Then add all the elements listed after it in the parameters
    arr.slice(start, end)                               //creates new arraw from "arr", from start (included) to end(not included)
    arr.slice(0, 3)                                     //returns items [0],[1] and [2] in a new array
    arr.slice(-2,)                                      //returns items [-2] (=semi-last) to the last item (because there is no second argument) in a new array
    arr.join("")                                        //joins elements from an array using what is inside the parentheses. Opposite of string.split("")
    str.slice(start, end)                               //returns the substring starting and including 'start' to ending but NOT including 'end'. By default end is to the end of the string if no data is added as input
    string.repeat(n)                                    //multiply a string n times
    
    Math.max(...arr)                                    // ... is the spread operator or syntax, creates a set of numbers from an array to be used as the input for Math.max(), which doesn't take arrays directly
    Math.pow(num, pow)                                  //turn a number to it's power (eg num = 2, pow =3 => 2^3 = 8)
    
    arr.includes(item, from)                            //search for 'item' in arr, an if it's in the array, it returns true, otherwise -1 (not false!!!)
    str.includes(substr, pos)                           //search for 'substr' in 'str' and if it's in the array, it returns true, otherwise false. 'pos' only searches from and including that index
    arr.indexOf(item, from) / arr.lastIndexOf(item)     //returns the index of the first/last item in the array with value 'item' - 'from' is optional to specify which index to start the searth at
    str.startsWith(str) / str.endsWith(str)             //true - if str starts/ends with substr; false - if not
    
    arr.sort()                                          //sorts arr's values in an alphabetical number
    arr.sort((a, b) => a - b)                           //sort by ascending order
    arr.sort((a, b) => b - a)                           //sort by desending order
    arr.sort(func)                                      //to use it for other that default, you need to add a compare function (compares 2 numbers, which is used by sort algorithm for all the elements autoamtically):
                                                            function compare(a, b){
                                                                // if result < 0 (negative) -> a is first
                                                                // if result = 0 -> no change
                                                                // if result > 0 (positive) -> b is first
                                                                return a-b      //eg a = 10, b = 5 -> a - b = positive, so b (5) will be the first element, and a (10) will come after
                                                            }
    arr.reverse()                                       //reverses and array in place and returns it (no new array is created!)
    str.charCodeAt(index);                              //returns the ASCII (Unicode) value of a character in a string


