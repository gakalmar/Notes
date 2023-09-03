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



const numbers = [2, 4, 6, 8, 10];

function isTriangle(a,b,c){
    let nums = [a,b,c].sort((a,b) => a-b);
    console.log(nums);
};

isTriangle(1,3,3);
isTriangle(4,3,3);