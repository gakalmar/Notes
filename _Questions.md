# Questions:  

Elméleti kérdések hogy lesznek a PA-n? (vagy csak check workbook?)


### 1 Div within div

- Adding many elements to a webpage: Do we create sub-divs or is it better to just list all elements on after another? (Product list vs Movie DB)

### 2 Sync & async reading

- When do we use sync & async reading methods?
- Best practice for async? (Is try required as in team task, or is it enough to have it like in the product list file?)
- Is it the same as blocking/non-blocking?

### 3 best practice for parsing & data reading
import * as fs from 'node:fs';

// Call it separately:
fs.readFile("data.json", "utf8", dataRead)

// Then create dataRead callback function:
let dataRead = (err, data) => {
    if (err){
        console.error(err);
        return;
    }
    ***  (When/why do we use try here? Isn't this only needed when we read it synchronized?)
    try {
        let jsonFile = JSON.parse(data);
        movieDB.movies = jsonFile.movies;
    } catch {
        console.error(`Error parsing the JSON data: `, err);
    };
    ***
    const jsonData = JSON.parse(data);      //PARSING DONE HERE IF WE DON'T USE TRY
    /// ALL FUNCTIONS TO BE CALLED HERE, THAT REQUIRE IMPORTED 'DATA' VARIABLE ///
}

### 4 Number conversion

- `Number("42")`
- `Number.parseInt()`: create an integer from a string, if it has a numeric representation
- `Number.parseFloat()`: create a floating-point number from a string, if it has a numeric representation

### 5 deep vs shallow copy (just to check if it's correct!)

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