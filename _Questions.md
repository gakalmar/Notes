
# To check & add:

- JS workflow of code reading (rewatch video tutorial)
- Get started with workbook
- ASCI characters and how to reference them
- Data object as a separate section

# Questions:  

### 1

Miert mukodik maskepp a ket loop?

const nameLength = (str) => {
    let words = str.split(" ");
    console.log(words);
    for (let word of words){
        word = word + " " + word.length;
    };
    return words;
};

const nameLength = (str) => {
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++){
        words[i] = words[i] + " " + words[i].length;
    };
    return words;
};
