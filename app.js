const fs = require("fs");
const path = require("path");

const firstPath = "./testFolder/first.txt";
const secondPath = "./testFolder/subFolder/second.txt";
// this file stores all content from above files (it gets appended every time the program is run)
const thirdPath = "./testFolder/third.txt";

// files that store random numbers
const storeNums = [firstPath, secondPath];

function generateNums() {
    let nums = "";
    // generate 100 random numbers from 0 to 999;
    for (let i = 0; i < 100000; i++) {
        const num = Math.floor(Math.random() * (500 - 100 + 1) + 100);
        nums += `${num} `
    }
    return nums;
}


storeNums.forEach((path, i, arr) => {
    fs.writeFileSync(path, generateNums());
})


// combined content from first and second files
let combinedContent = "";
storeNums.forEach(path => {
    const content = fs.readFileSync(path, "utf-8");
    combinedContent += content;
});

fs.writeFileSync(thirdPath, combinedContent);