const fs = require("fs");

// promises are always executed after synchronous code (this is how the event loop works)
// that is why we need to use await (inside an async function) when calling a function that return a promise so that all the code after await "waits" for a response to come back first
// node has default promisified read/write functions that return promises
// this allows developers to use async/await syntax without writing their own promises
// it is strongly advised to put await statements inside try/catch blocks
// so when an error occurs, the program runs the catch block
// when there's no error, it only executes the try block
// default promisified write function in node probably looks like this:
/*
    function writeFile(path, data, options) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, options(err) => {
                if (err) reject(err);
                resolve();
            })
        })
    }
*/
// promisifed read function:
/*
    function readFile(path, options = "utf-8") {
        return new Promise((resolve, reject) => {
            fs.readFile(path, options, (err, data) => {
                if (err) reject(err);
                resolve(data);
            }) 
        })
    }
*/

(async () => {
    try {
        await fs.promises.writeFile("./testFolder/first.txt", "hi", "utf-8");
        console.log(await fs.promises.readFile("./testFolder/first.txt", "utf-8"));
        await fs.promises.writeFile("./testFolder/first.txt", "hello", "utf-8");
        console.log(await fs.promises.readFile("./testFolder/first.txt", "utf-8"));
    } catch (err) {
        console.error(err);
    }
})();