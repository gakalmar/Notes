function toJadenCase(str1){
    let words = str1.split(" ")
    for (let i = 0; i < words.length; i++){
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
}

console.log(toJadenCase("How can mirrors be real if our eyes aren't real"));