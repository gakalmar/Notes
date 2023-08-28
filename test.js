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

function getSum(a, b){
  let bigger = Math.max(a, b);
  let smaller = Math.min(a, b);
  let sum = smaller;
  if (a === b){
      return a;
  } else if(minimum + 1 === maximum){
      return a+b;
  }  else {
      for (let i = 0; i < bigger - smaller - 1 ; i++){
          sum += (smaller+i);
      };
  };
  return sum+1;
};

console.log(getSum(0, -1));
console.log(getSum(0, 1));
console.log(getSum(2, 2));