function disemvowel(str) {
    str = str.replace(/a/gi, "");
    str = str.replace(/e/gi, "");
    str = str.replace(/i/gi, "");
    str = str.replace(/o/gi, "");
    str = str.replace(/u/gi, "");
    return str;
}

console.log(disemvowel("This website LOL"));