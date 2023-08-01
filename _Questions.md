Questions:

1 --------------------------------------------------------------------------------------------------------------------------------

const animals = [
    { name: 'Mango', type: 'dog', age: 7 },
    { name: 'Berry', type: 'dog', age: 12 },
];
  
for (let i = 0; i < animals.length; i++) {
    const animal = animals[i];                      //WHY DOES THE LOOP CHANGE THE VALUE OF ANIMAL IF IT'S A CONSTANT?
    
    console.log(animal);
}

2 --------------------------------------------------------------------------------------------------------------------------------

What is the difference in a 'for of loop' if I declare the iterate with a 'let' or a 'const'? For example:

let favMovies = [{title: "Film1", year: 2012}, {title: "Film1", year: 2012}]
for (let film of favMovies){
    console.log(film.title);
}

AS OPPOSED TO:

let favMovies = [{title: "Film1", year: 2012}, {title: "Film1", year: 2012}]
for (const film of favMovies){
    console.log(film.title);
}

3 --------------------------------------------------------------------------------------------------------------------------------

let favouriteBook = {
    title: "Artemis",
    author: "Andy Weir",
    year: 2017,
    age: 2023 - favouriteBook.year                  //CAN'T ACCESS THIS INFORMATION BEFORE INITIALIZATION - HOW TO DO IT INSTEAD?
}
console.log(favouriteBook.age);

4 --------------------------------------------------------------------------------------------------------------------------------

Indentation default should be 2 or 4 whitespaces in JS?
When to use whitespaces? (eg. let a=1 or let a = 1 )