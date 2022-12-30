const http = require("http");
const port = 5000;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("<a href=\"/about\">About page</a>");
    }
    else if (req.url === "/about") {
        
        // making the loop asynchronous by putting it inside a setTimeout with a 0ms delay
        setTimeout(() => {
            console.log("loop began");

            let x = 0;
            while (x < 1e9) {
                x += 1;
            }

            console.log("loop done");
        }, 0);

        console.log("redirect");
        res.end("About page");
    }
    else {
        res.end("Not found");
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})