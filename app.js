const fs = require("fs");
const path = require("path");

const firstPath = "./testFolder/first.txt";
const secondPath = "./testFolder/subFolder/second.txt";
const thirdPath = "./testFolder/third.txt";

let nums = "";

for (let i = 0; i < 10; i++) {
    const randNum = Math.floor(Math.random() * (500 - 100 + 1) + 100);
    nums += `${randNum} `;
}

console.log(nums);

fs.writeFile(
    firstPath,
    nums, 
    { flag: "a" },
    (err) => {
        if (err) throw err;
    }
)

fs.readFile(firstPath, "utf-8", (err, data) => {
    if (err) throw err;

    let numsArr = data.split(" ");
    numsArr.splice(numsArr.length - 1, 1);

    console.log(numsArr);
    console.log(numsArr.length);
})