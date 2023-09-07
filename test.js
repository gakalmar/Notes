// const numbers = [9, 2, 7, 5, 3, 1, 8, 6, 4];
// for (let i = 0; i < numbers.length - 1; i++) {
//   for (let j = 0; j < numbers.length - 1 - i; j++) {
//     if (numbers[j] > numbers[j + 1]) {
//       // Swap elements
//       const temp = numbers[j];
//       numbers[j] = numbers[j + 1];
//       numbers[j + 1] = temp;
//     }
//   }
// }
// console.log(numbers);


const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function doMath(num, mod1, mod2, mod3){
    return mod3(mod2(mod1(num)));
}

function doubleVision(num){
    return parseInt(String(num)+String(num));
}

function squareNum(num){
    return num*num;
}

function addRandom(num){
    return num+Math.floor(Math.random()*100);
}
console.log(doMath(5, doubleVision, squareNum, addRandom));
console.log(doMath(2, addRandom, squareNum, doubleVision));
console.log(doMath(3, squareNum, addRandom, doubleVision));