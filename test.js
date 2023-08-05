function reverseWords(str) {
    let strArray = str.split(" ");
    let reverseArray = [];
    for (let word of strArray){
        let reverseWord = "";
        for (let i = word.length-1; i >= 0; i--){
            //console.log(word[i]);
            reverseWord += word[i];
        };
        reverseArray.push(reverseWord);
    }
    return reverseArray.join(" ");
};



console.log(reverseWords("Testing to see what it does"));
