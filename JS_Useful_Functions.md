GENERAL:

STRINGS:

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

ARRAYS:

map, filter, find

array.push('item1')                                 //add item to end of array
array.pop('item2')                                  //remove item from end
array.shift('item3')                                //add item to start
array.unshift('item4')                              //remove item from start
array[1]                                            //returns 2nd item in array with index1
array.splice(index1, number)                        //removes the number of items from index1

array.reverse()                                     //reverses array order in place (it changes the original too!)

array.slice(firstindex, lastindex)                  //returns the array from first index to last index (no value means from start or to end)
                                                      firstindex - IS included
                                                      lastindex - ISN'T included (leave it empty if you want to list the items to the last item)

array.map()                                         //creates a new array by applying a function to each element of an existing array.
array.filter(condition)                             //creates a new array with elements that pass a specific condition
                                                    //condition example: (elementInArray => elementInArray.length > 4)

parseInt("42")                                      //converts a string into an integer
parseFloat("42.184923")                             //converts a string into a float
42.toString()                                       //converts a number into a string

OBJECTS:

delete myObject.propertyN;                           //deletes the propertyN of an object                

MATH:

Math.max(...arrayOfNumbers) or                      //returns max or min values of an array
    Math.max(1, 2, 3)
Math.min(...arrayOfNumbers) or
    Math.min(1, 2, 3)
Math.Pi                                             //Refers to 3.1415...
Marh.floor(fractionalNumber)                        //Returns the whole values of a number (integer from float)

BUILT-IN FUNCTIONS:

let today = new Date();                             //Gets today's date in this format: "Sat Jul 02 2023 09:30:00 GMT+0530 (India Standard Time)"
let year = today.getFullYear();                     //Get only 'YYYY' format from previously generated date
let month = today.getMonth() + 1;                   //Get 'MM' or 'M' - Months are zero-indexed, so we add 1 to get the correct month.
let day = today.getDate();                          //Get 'DD' or 'D' format of the day
let todayShort = new Date(`${year}-${month}-${day}`)//To get it in a short version

let date1 = new Date(todayShort);                   //Calculate AGE (substract 2 dates)
let date2 = new Date(`1986-10-4`);                  
let age = (date1 - date2)*1000*60*60*24*365         //Substract 2 dates and multiply the result in millisecs until you get years (use Math.floor() to get whole numbers)