function isSortedAndHow(array) {
    let isAscending = true;
    let isDescending = true;
    for (let i = 1; i < array.length; i++){
        if (!(array[i] >= array[i-1])){
            isAscending = false;
        };
    };
    if (isAscending){
        return "yes, ascending";
    };
    for (let i = 1; i < array.length; i++){
        if (!(array[i] <= array[i-1])){
            isDescending = false;
        };
    };
    if (isDescending){
        return "yes, descending";
    };
    if (!isAscending && !isDescending){
        return "no";
    };
};


console.log(isSortedAndHow([1, 2, 3, 4, 6]));  // yes, ascending
console.log(isSortedAndHow([15, 7, 3, -8]));   // yes, descending
console.log(isSortedAndHow([4, 2, 30, 4, 65])); // no