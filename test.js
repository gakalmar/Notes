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

const filterEvenNumbers = (nums) => {
    return nums.filter(num => num % 2 === 0);
}

const numbers = [1, 2, 3, 4, 5, 6];
const evens = filterEvenNumbers(numbers);
console.log(evens); // Should output [2, 4, 6]
