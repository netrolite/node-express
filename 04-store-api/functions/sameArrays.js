function sameArrays(arr1, arr2) {
    arr1 = JSON.stringify(arr1);
    arr2 = JSON.stringify(arr2);
    return arr1 === arr2;
}

module.exports = sameArrays;