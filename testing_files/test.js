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

let numbersString = "1, 3, 5, 76, 53, 231, 12, 0"

const hECMAthlon = {};
hECMAthlon.getMaxValue = (input) => {
    return [`${(input.split(",")).reduce((max, current) => {
        return parseInt(current) > parseInt(max) ? [parseInt(current)] : [parseInt(max)];
    }, [0])}`];
};

console.log(hECMAthlon.getMaxValue(numbersString));