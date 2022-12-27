function add(expression) {
    let numsToAdd = expression.split("+");

    // convert to numbers
    numsToAdd.forEach((num, i) => {
        // parseFloat works both for integers and floats
        // parseInt removes all digits after floating point
        if (Number.isInteger(parseInt(num))) {
            numsToAdd[i] = parseFloat(num);
        }
        else {
            throw new Error("Incorrect data type. You can only pass integers and floats");
        }
    });

    const sum = numsToAdd.reduce((acc, curr) => {
        return acc + curr;j
    }, 0)

    return sum;
};

console.log(add("58.2 + 22"));

module.exports = { add };