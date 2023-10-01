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

let text = "Indivisibilities";

let textLow = text.toLowerCase();
let textChars = new Set(textLow.split(""));

console.log("\x1b[31mThis is red text\x1b[0m");
console.log("\x1b[32mThis is green text\x1b[0m");
console.log("\x1b[33mThis is yellow text\x1b[0m");
console.log("\x1b[34mThis is blue text\x1b[0m");