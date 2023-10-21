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

const url = new URL('https://example.com/some-page?param1=value1&param2=value2&param3=value3');
const params = new URLSearchParams(url.search);
const allParameters = {};
for (const param of params) {
    const [name, value] = param;
    allParameters[name] = value;
}

console.log(params);
console.log(...params);