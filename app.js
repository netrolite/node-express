const fs = require("fs");

const filePath = "./testFolder/first.txt";

console.log("first");

// fs.readFile is async
fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(data);
    console.log("second");
})

console.log("third");