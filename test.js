function sortByLength(array) {
    let arrSorted = [];
    let longestWordLen = array[0].length;

    for (let item of array) {
        if (item.length > longestWordLen) {
            longestWordLen = item.length;
        }
    };
    let emptyStrings = [];
    let nonEmptyStrings = [];
    for (let item of array) {
        if (item === "") {
            emptyStrings.push(item);
        } else {
            nonEmptyStrings.push(item);
        }
    };
    for (let i = 0; i <= longestWordLen; i++) {
        for (let item of nonEmptyStrings) {
            if (item.length === i) {
                arrSorted.push(item);
            }
        }
    };
    arrSorted = emptyStrings.concat(arrSorted);
    return arrSorted;
}

console.log(sortByLength(["", "Moderately", "Brains", "Pizza"]));

//Expected result: ["", "Pizza, "Brains", "Moderately"]