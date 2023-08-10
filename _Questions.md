To check:

-JS workflow of code reading (rewatch video tutorial)
-Get started with workbook

Questions:

1 --------------------------------------------------------------------------------------------------------------------------------

let favouriteBook = {
    title: "Artemis",
    author: "Andy Weir",
    year: 2017,
    age: 2023 - favouriteBook.year                  //CAN'T ACCESS THIS INFORMATION BEFORE INITIALIZATION - HOW TO DO IT INSTEAD?
}
console.log(favouriteBook.age);

4 --------------------------------------------------------------------------------------------------------------------------------

What happens at git push level, when first push is interrupted with a pull? (merge development branch on remote)

5 --------------------------------------------------------------------------------------------------------------------------------

Truthy - Falsy

if (""){                                    //("") -> false -> "Value is falsy"
        console.log("Value is truthy");
    } else {
        console.log("Value is falsy");      
    }

if ("Not empty"){                           //("Not empty") -> true -> "Value is truthy"
        console.log("Value is truthy");
    } else {
        console.log("Value is falsy");
    }

VS

console.log("" == true);                    //false
console.log("" == false);                   //true
console.log("Not empty" == true);           //false - why isn't this true?
console.log("Not empty" == false);          //false

SAME WITH === :
console.log("" === true);                   //false
console.log("" === false);                  //false
console.log("Not empty" === true);          //false
console.log("Not empty" === false);         //false