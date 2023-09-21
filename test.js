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


let nums1 = [1, 5, 9, 0];


function logNums(nums, callback){
    nums.forEach(num => {
        console.log(num)
        callback(num);
    })    
}

function oddOrEven(number){
    if (number % 2 === 0){
        console.log(`${number} is even!`)
    } else {
        console.log(`${number} is odd!`)
    }
}

logNums(nums1, oddOrEven);

console.log("hello"[0]);
console.log("hello"[3]);
console.log("hello"[0, 3]);