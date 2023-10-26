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

    string.startsWith("strTest")                        //returns true if "string" starts with "strTest"
    string.endsWith("strTest")                          //returns true if "string" ends with "strTest"

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
    array.splice(index1, number, add1, ...addn)         //removes the number of items from index1, then adds all items listed after

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
    splice(start[, deleteCount[, item1[, item2[, ...]]]])   //Removes & then adds elements from an array and returns the removed elements, if any.
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

# Higher order functions

    FOR EACH
    arr.forEach(callback[, thisArg])                    //Executes the provided function once for each array element.
    arr.forEach(item => {//dothis//})                   //the default parameters are item - current item; index - it's index; sourcearr - the array it's from
    arr.forEach(callback(item, index, sourcearr))       //the default parameters are item - current item; index - it's index; sourcearr - the array it's from
                                                        //doesn't return a new array

    MAP (call it when creatin new arr)
    map(callback[, thisArg])                            //Creates a new array with the results of calling the provided function on every element in the array.
    arr.map(function(item, index, array))               //Returns an array of modified values (eg. let arr = ["Bilbo", "Frodo", "Gollum"]); arr.map(item => item.length) => returns an array with the words' length values
    
    FILTER (call it when creatin new arr)
    filter(callback[, thisArg])                         //Creates a new array with all elements that pass the test implemented by the provided function.
    arr.filter(function(item, index, array))            //filter returns an array of all matching elements if condition within is true
    arr.filter(item => item % 2 === 0)
    (use FIND for first match only)

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
    number.toString(2)                                  //converts a number into its binary valu
    
    string.split(", ")                                  //create an array from a string. Opposite of arr.join("")
    string.split(" ", 3)                                //The second parameter show how long the return array should be maximum (3 items)
    
    arr.replace                                         //this doesn't exist, only with strings. Use the index number instead to declara a new value to it (eg arr[0] = "New item" => this will be new 0th item in the array)
    arr.splice(start, number, item1,...itemN)           //removes "number" elements from list from 'start' (included). Then add all the elements listed after it in the parameters.
                                                        //it the also returns a new array with the removed items
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
    
    arr.sort()                                          //sorts arr's items in an alphabetical order (based on UTF-16 Unicode values) (in place, so no new array!)
    arr.sort((a, b) => a - b)                           //sort by ascending order
    arr.sort((a, b) => b - a)                           //sort by desending order
    arr.sort(func)                                      //to use it for other that default, you need to add a compare function (compares 2 numbers, which is used by sort algorithm for all the elements autoamtically):
                                                            function compare(a, b){
                                                                // if result < 0 (negative) -> a is first
                                                                // if result = 0 -> no change
                                                                // if result > 0 (positive) -> b is first 
                                                                return a-b      //eg a = 10, b = 5 -> a - b = positive, so b (5) will be the first element, and a (10) will come after
                                                            }
    arr.toSorted()                                      //immutable version of sort() -> this creates a new array
    arr.sort((a, b) => a.localeCompare(b));             //Sort array with strings including foreign characters (eg. é, á, ü, ó...)
    arr.sort((a, b) => {                                //This is needed if we want to set alphabetical order based on object's keys
        if (a.key < b.key){ return -1}                    (only in a comparison like > or < will we get a numeric conversion to work with, so the basic a - b way doesn't work)
        if (a.key > b.key){ return 1}
        return 0;})
    arr.reverse()                                       //reverses and array in place and returns it (no new array is created!)
    str.charCodeAt(index);                              //returns the ASCII (Unicode) value of a character in a string

# Web related

### Console display

    console.count()                                     //logs and also adds a counter when logged (eg. console.count("x")) => this will log: "x: 1 \nl x: 2... x: 5"
    console.table()                                     //display an array as a table to make it easier to read it in the console
    console.dir()                                       //force JSON format display (use it after .log to compare)
    console.group()                                     //display messages in the console as a group (until group end is called) -> makes it easier to read
    console.groupCollapsed()                            //make sub-group (groupend needed for this one too!)
    console.groupEnd()                                  //end group message display

    console.count()                                     //counts and logs the number a function has been invoked
    console.countReset()
    console.trace()                                     //??
    console.time()                                      //display the time between 2 function calls
    console.timeEnd()

    console.warn();                                     //additional levels of displaying information in the browser's console besides .log
    console.error();
    
### Timeouts

    setTimeout(func, time);                                     //executes a function after a waiting period (eg time = 3000 -> milliseconds, so it will be 3 seconds) -- IT DOESN'T WORK LIKE THIS: setTimeout(console.log("Hello"), 1000)!!!
                                                                //returns intervalID as default, not the finction's value (eg. let intervalID = setTimeout(func, 3000)) -> console.log(intervalID) -> 3
                                                                //execute a funcX every Y seconds, by nesting into itself: const funcX = () => {console.log("Hello"); setTimeout(funcX, Y*1000)};
    setTimeout(func[,0]);                                       //this is used to execute the func right after the previous one is completed (that's why there is a differenc between nested setTimeout and setInterval time intervals)
    setInterval(func, time);                                    //this is better for running a function every Y seconds, but not as flexible (the other one can be modified for the next execution). 
                                                                //Intervals for nested execution start after the first func is executed, while setinterval method timer starts at the beginning of the func execution
    clearTimeout(intervalID);                                   //with a function calling itself again and again, you can stop it after some time with this function

### JSON

    import * as fs from 'node:fs';
    fs.readFile('filename.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        try {
            let jsonData = JSON.parse(data);
        } catch (err){
            console.error(`Error parsing the JSON data: `, err);
        }
    });
    fs.readFile("data.json", "utf8", dataRead)

### DOM manipulation

    document.getElementById("id")                               //get an object with a specific id (make it a const to store it)
    document.getElementsByClassName("myClass")                  //get an object with a specific class (make it an array to store it)
    document.getElementsByTagName("div")                        //get an object with a specific tag (make it an array to store it)

    document.querySelector(".myClass")                          //get the first object with a specific class (make it a const to store it)
    document.querySelector("#myID")                             //get the first object with a specific Id (make it a const to store it)
    document.querySelectorAll("p")                              //get an array of objects with a CSS selector (make it an array to store them)
    document.querySelectorAll("[data-type]")                    //select all elements that have a "data-type" attribute
    document.querySelectorAll("div.note, div.alert")            //select elements with a class of either note or alert
    document.querySelectorAll("div.highlighted > p")            //select <p> elements whose immediate parent element is a <div> with the class highlighted
                                                                //read more about combinators on CSS and Events file!

    document.querySelectorAll(".container p")                   //select elements within others - For example, to select all <p> elements within a <div> with the class "container"

    element.addEventListener("event", function)                 //register an event handler(listener) to an item, by telling which event it should be triggered with ("event" -> eg. "click", "mouseover" or "focus")
    element.removeEventListner("event", function)               //removes "function" from the registered listeners of an item
    element.addEventListener("event", functionX)                //when you create functionX, you can add a parameter (eg (e) or (event) or similar, so you can refer to the item itself with e.target -> eg. e.target.style.backgroundColor = "black";)
                                                                //when you refer to a general object: document.body.style.backgroundColor = "black";
                                                                //"event" - "click", "change", "input", "load"

    element.remove()                                            //removes that element

    element.insertAdjacentHTML("where", "what")                 //add HTML to a certain element ("where" -> "afterEnd", "beforeEnd", "afterBegin", "beforeBegin")
    element.innerHTML = "<p>text</p>";                          //Gets or sets the HTML content of an element
    element.outerHTML                                           //Makes reference to the whole element (eg a div has the id="container", document.getElementsById("container").outerHTML will be the whole <div> element)
    element.textContent = "New text content";                   //replaces/adds new text content to an element (returns `null` for "document" or "doctype")
                                                                //!!! removes all children first, and then fills it up with just text content!

    element.getAttribute("class")                               //get the value of an attribute of an element (store it as a constant)
    element.setAttribute("class", "myClass")                    //"class" attribute's new value will be "myClass"
    element.removeAttribute("class")                            //removes the attribute from an element

    element.classList.add("active");                            //Allows you to add, remove, or toggle CSS classes on an element
    element.classList.remove("inactive");
    element.classList.toggle("highlight");

    element.disabled = false / true;                            //use this to disable an element (eg button). true - disabled // false - enabled

    element.preventDefault()                                    //prevents default behaviour if it's called on the element 
    event.stopPropagation()                                     //when called inside an event handler, prevents the event from bubbling up to any other elements
                                                                //full example here: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events
                                                                //look for "preventing default behaviour"
                                                                //look for "video player example"

    event.target ->                                             //use this instead of "element" when inside event handler function

    Object.assign:
        const target = { a: 1, b: 2 };
        const source = { b: 4, c: 5 };

        const returnedTarget = Object.assign(target, source);   // target object will be updated to include all updates from "source", if any keys are overlapping, they get overwritten. 
                                                                // returnedTarget === target -> true !!!

# URL update/query

    // Get current URL:
    let currentURL = window.location.href;
    const urlObj = new URL(currentURL);
    
    // Get any parameters (specific!):
    const parameters = urlObj.searchParams;
    const cc = parameters.get("paramName");
    
    // Get ALL parameters (non-specific!):
    const url = new URL('https://example.com/some-page?param1=value1&param2=value2&param3=value3');
    const params = Object.fromEntries(urlObj.searchParams.entries());

    // Or like this:
    const url = new URL('https://example.com/some-page?param1=value1&param2=value2&param3=value3');
    const params = new URLSearchParams(url.search);
    const allParameters = {};
    for (const param of params) {
        const [name, value] = param;
        allParameters[name] = value;
    }

    // Update URL:
    const newURL = `?paramName=${paramValue}`;
    window.history.pushState(null, '', newURL);

    // Reload the current page
    window.location.reload();

    // ALTERNATIVE: (?)
    URLSearchPArams

### Fetch:
    const functionName = async(url) => {                // General fetch
        try{
            const response = await fetch(url);
            const data = await response.json();
            // WORK HERE WITH FETCHED DATA
        } catch (error) {
            console.error(error);
        }
    };

    let newArr = myArr.map(item => {                    // Promise.all is used for higher order functions
        return funcName(item);
    });
    newArr = await Promise.all(newArr);

### Date object:

    // Get today's value in ISOstring format ("YYYY-MM-DD"):
    const today = new Date();
    const todayFormatted = today.toISOString().slice(0, 10);
                
    // Get previous/next day:
    const displayedDate = new Date (datePickerElement.value);       // Current date inside date picker element
    displayedDate.setDate(displayedDate.getDate() -/+ 1);           // Once converted to Date object, we can subtract/add 1 day
    const prevDay = new Date (displayedDate);                       // Create new Date object with new date 
    const prevDayFormatted = prevDay.toISOString().slice(0, 10);    // Create ISOstring from it