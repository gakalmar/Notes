// // 01 - Help your granny!
// // https://www.codewars.com/kata/5536a85b6ed4ee5a78000035/train/javascript
// function tour(friends, fTowns, distTable) {
//     const fTownsOrdered = [];
//     const distancesOrdered = [];

//     friends.forEach(friend => {
//         if (fTowns.find(f => friend == f[0])){
//             fTownsOrdered.push(fTowns.filter(fr => fr[0] == friend)[0])
//         }
//     });

//     fTownsOrdered.forEach(item => {
//         let currentItemIndex = distTable.findIndex((i) => item[1] == i);
//         distancesOrdered.push(distTable[currentItemIndex+1]);
//     })

//     let totalDistance = distancesOrdered[0] + distancesOrdered[distancesOrdered.length-1];

//     if (fTownsOrdered.length <= 1){
//         return 0
//     } else if ( fTownsOrdered.length <= 2){
//         return totalDistance
//     } else {
//         for (let i = 1; i < distancesOrdered.length; i += 1){
//             let currentDist = Math.abs(Math.sqrt(Math.pow(distancesOrdered[i], 2) - Math.pow(distancesOrdered[i-1], 2)));
//             totalDistance += currentDist;
//         }

//         return Math.floor(totalDistance);
//     }
// }

// var friends1 = ["A1", "A2", "A3", "A4", "A5"];
// var fTowns1 = [["A1", "X1"], ["A2", "X2"], ["A3", "X3"], ["A4", "X4"]];
// var distTable1 = ["X1", 100.0, "X2", 200.0, "X3", 250.0, "X4", 300.0];

// console.log(tour(friends1, fTowns1, distTable1))

// // 02 - Snail
// // https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1
// function snail(array){
//     const snailRes = [];
//     let steps = array.length;
//     let totalSteps = steps*steps;

//     for(let n=0; n<totalSteps; n++){
//         // phase 1 - add upper row
//         for (let i = 0; i < array.length-2*n; i++){
//             snailRes.push(array[n][n+i])
//             totalSteps--;
//             if (totalSteps == 0){return snailRes}
//         }

//         // phase 2 - add last items vertically, apart from the first and last items:
//         for (let i = n+1; i < array.length-1; i++){
//             snailRes.push(array[i][array.length-1-n]);
//             totalSteps--;
//             if (totalSteps == 0){return snailRes}
//         }

//         // phase 3 - add last row reversed:
//         for (let i = array.length-1-n; i >= n+0; i--){
//             snailRes.push(array[array.length-1-2*n][i])
//             totalSteps--;
//             if (totalSteps == 0){return snailRes}
//         }

//         // phase 4 - add last items vertically reversed, apart from the first and last items:
//         for (let i = array.length-2-n; i > n; i--){
//             snailRes.push(array[i][n]);
//             totalSteps--;
//             if (totalSteps == 0){return snailRes}
//         }
//     }

//     console.log(totalSteps);
//     return snailRes;
// }

// console.log("Result:");
// console.log(snail([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]]))
// console.log("Correct result should be:");
// console.log([1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13]);

// 03 - Maximum subarray sum 
// https://www.codewars.com/kata/54521e9ec8e60bc4de000d6c/train/javascript

// Itt magat a feladatot sem ertem

// 04 - Weight for weight
// https://www.codewars.com/kata/55c6126177c9441a570000cc
// function orderWeight(strng) {
//     return strng.split(" ").sort().sort((a, b) => a.toString().split("").reduce((acc, curr) => parseInt(acc) + parseInt(curr), 0) - b.toString().split("").reduce((acc, curr) => parseInt(acc) + parseInt(curr), 0)).join(" ");
// }

// console.log(orderWeight("103 123 4444 99 2000"));

// 05 - Valid Parentheses
// https://www.codewars.com/kata/52774a314c2333f0a7000688/train/javascript
// function validParentheses(parens) {
//     if (parens === ""){
//         return true;
//     }
//     let firstCharIsCorrect = parens[0] === "(";
//     let lastCharIsCorrect = parens[parens.length - 1] === ")";
//     let lParCounter = 0;
//     let rParCounter = 0;
//     let allParens = parens.split("")
//     for (let i = 0; i < allParens.length; i++){
//         if (allParens[i] === "(") lParCounter++; 
//         if (allParens[i] === ")") rParCounter++;
//         if (rParCounter > lParCounter) return false;
//     }
//     return firstCharIsCorrect && lastCharIsCorrect && lParCounter === rParCounter;
// }

// Random 6kju katas:
// A. Duplicate encoder:
// function duplicateEncode(word){
//     const lcword = word.toLowerCase();
//     const chars = lcword.split("");
//     let encodedWord = "";
//     console.log(chars);
//     chars.forEach(char => {
//         const currentCharCount = chars.filter(c => c === char).length;
//         if (currentCharCount == 1){
//             encodedWord += "("
//         } else {
//             encodedWord += ")"
//         }
//         console.log(currentCharCount);
//     });
//     return encodedWord;
// }

// console.log(duplicateEncode("Success"));

// B. Take a Ten Minutes Walk
// function isValidWalk(walk) {
//     const possibleDirections = ["s", "n", "e", "w"];
//     let dirCounts = [];
//     possibleDirections.forEach((direction, index) => {
//         dirCounts.push(walk.filter(char => char === direction).length);
//     });
//     if (dirCounts[0] === dirCounts[1] && dirCounts[2] === dirCounts[3] && walk.length === 10){
//         return true;
//     } else {
//         return false;
//     }
// }

// console.log(isValidWalk(['n','s','n','s','n','s','n','s','n','s']));
// console.log(isValidWalk(['n','s','n','s','n','s','n','s','n']));

// C. Replace with alphabetical position
// function alphabetPosition(text) {
//     const positions = [];
//     text.toLowerCase().split("").forEach(char => {
//         if (char.charCodeAt(0) - 96 > 0 && char.charCodeAt(0) - 96 < 27)
//         positions.push(char.charCodeAt(0) - 96)
//     });
//     return positions.join(" ");
// }

// console.log(alphabetPosition("The sunset sets at twelve o' clock."));

// D. Sort the odd
// function sortArray(array) {
//     let oddValues = array.filter(num => num % 2 !== 0);
//     oddValues.sort((a, b) => a-b);
//     console.log(oddValues);
//     let counter = 0;
//     let sorted = array.map(num => {
//         if (num % 2 === 0){
//             return num;
//         } else {
//             counter++;
//             return oddValues[counter-1];
//         }
//     })
//     return sorted;
// }

// console.log(sortArray([5, 3, 2, 8, 1, 4]));
// console.log("Expected:");
// console.log([1, 3, 2, 8, 5, 4]);


// // E. Persistent bugger
// function persistence(num) {
//     let finalNum = num;
//     let steps = 0;
//     while (finalNum.toString().length > 1){
//         let currentNum = 1;
//         finalNum.toString().split("").forEach(charNum => {
//             currentNum *= charNum
//         });
//         finalNum = currentNum;
//         steps++;
//     };
//     return steps;
// }

// console.log(persistence(4));
// console.log(persistence(25));
// console.log(persistence(39));
// console.log(persistence(999));

// F. Convert string to camel case
// function toCamelCase(str){
//     let words = str.split(/[-_]/);
//     let finalString = words[0];
//     if (str.length = 0){
//         return "";
//     } else if (words.length === 1) {
//         return str;
//     } else {
//         for (let i = 1; i < words.length; i++){
//             finalString += words[i].charAt(0).toUpperCase() + words[i].slice(1);
//         }
//         return finalString;
//     }
// }

// console.log(toCamelCase("the_stealth_warrior"));

// G. Does my number look big in this?
// function narcissistic(value) {
//     let nums = value.toString().split("");
//     let numLen = value.toString().length;
//     let numSum = 0;
//     for (let i = 0; i < numLen; i++){
//         numSum += Math.pow(Number.parseInt(nums[i]), numLen);
//     }
//     return value === numSum;
// }

// console.log(narcissistic(152));
// console.log(narcissistic(153));

// H. Your order, please

// function order(words) {
//     let wordsArr = words.split(" ");
//     let orderedWords = [];
    
//     for (let i = 1; i <= wordsArr.length; i++) {
//         let foundWord = false;
//         let nextWord = (wordsArr.find(word => {
//             word.split("").forEach(char => {
//                 if (char == i){
//                     foundWord = true;
//                 }
//             })
//             return foundWord;
//         }))
//         orderedWords.push(nextWord);
//     }
//     return orderedWords.join(" ");
// }

// console.log(order("4of Fo1r pe6ople g3ood th5e the2"));

// I. Tribonacci Sequence
// function tribonacci(signature,n){
//     let tribSq = [...signature];
//     if(n === 0){
//         return [];
//     } else if (n === 1){
//         return [signature[n-1]];
//     } else if (n === 2){
//         return [signature[n-1], signature[n-2]];
//     }

//     while (n - 3 > 0){
//         let nextNum = 0;
//         for(let i = tribSq.length; i > tribSq.length - 3; i--){
//             nextNum = tribSq[tribSq.length-1] + tribSq[tribSq.length-2] + tribSq[tribSq.length-3]
//         }
//         tribSq.push(nextNum);
//         n--;
//     }
//     return(tribSq);
// }

// console.log(tribonacci([1,1,1], 10));
// console.log("Expected:");
// console.log([1,1,1,3,5,9,17,31,57,105]);

console.log("sutemeny".includes("sut"));