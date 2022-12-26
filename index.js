// function makeRequest(location) {
//     return new Promise((resolve, reject) => {
//         if (location === "google") {
//             resolve("google says hi");
//         }
//         else {
//             reject("we can only talk to google");
//         }
//     })
// }

// function processRequest(response) {
//     return new Promise((resolve, reject) => {
//         console.log("Processing response");
//         resolve(`Extra information + ${response}`)
//     })
// }

const one = new Promise((resolve, reject) => {
    console.log("first promise began");

    let a = 0;
    while (a < 1000000000) a += 1;

    resolve("first done");
})

const two = new Promise((resolve, reject) => {
    console.log("second promise began");
    
    let a = 0;
    while (a < 1000000000) a += 1;

    reject("second done");
})

const three = new Promise((resolve, reject) => {
    console.log("third promise began");

    let a = 0;
    while (a < 1000000000) a += 1;

    resolve("third done");
})

Promise.race([
    one, two, three
])
    .then(data => {
        console.warn("===================================")
    
        if (typeof data === "object") {
            data.forEach(item => {
                console.log(`status: ${item.status}`);
                
                if (item.status === "fulfilled") {
                    console.log(`value: ${item.value}`)
                }
                else {
                    console.log(`reason: ${item.reason}`)
                }
                if (data[data.length - 1] !== item) {
                    console.log("------------------");
                }
            });
        }
        else console.log(data);
    })
    .catch(err => console.error(err))
