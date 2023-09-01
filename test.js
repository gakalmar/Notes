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

let s1 = "aretheyhere";
let s2 = "yestheyarehere";
function longest(s1, s2) {
    let allChars = (s1+s2).split("");
    console.log(allChars);
    let rtnStr = [];
    for (let char of allChars){
        let exists = false;
        for (let char2 of rtnStr){
            if (char === char2){
                exists = true;
                break;
            };
        };
        if (!exists){
            rtnStr.push(char);
        };
    };
    return rtnStr.sort().join("");
}

console.log(longest(s1,s2));