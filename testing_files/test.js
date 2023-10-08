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

function apparently(string) {
    let rtnStr = [];
    if (!string){
        return "";
    } else {
        string.split(" ").forEach((word, i) => {
            if (((word === "and") || (word === "but"))){
                if (word[i+1] !== "apparently"){
                    rtnStr.push(word);
                    rtnStr.push("apparently");
                } else if (word[i+1] === "apparently") {
                    rtnStr.push(word);
                }
            } else {
                rtnStr.push(word);
            }
        });
        let final = rtnStr.pop();
        return final.join(" ");
    }
}

console.log(apparently(""));
console.log(apparently("apparently"));
console.log(apparently("It was great and I have never been on live television before but sometimes I dont watch this."));