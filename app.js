const path = require("path");

const absoluteFilePath = path.resolve(__dirname, "testFolder", "subFolder", "text.txt");

console.log(absoluteFilePath);