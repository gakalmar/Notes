function highAndLow(numbers){
    numbersArray = numbers.split(' ');
    for (let i = 0; i < numbersArray.length; i++){
        numbersArray[i] = parseInt(numbersArray[i]);
    }
    console.log(typeof numbersArray[1]);
    console.log(Math.max(...numbersArray));
    console.log(Math.min(...numbersArray));
    return [Math.max(numbersArray), Math.min(numbers)]
}

console.log(highAndLow("1 2 -2 9"));