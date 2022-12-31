const http = require("http");
const fs = require("fs");
const port = 5000;

// using readStream to send data in chunks instead of 1 huge file
const server = http.createServer((req, res) => {
    const filename = "./file.txt";

    // open file as a readable stream
    const readStream = fs.createReadStream(filename, "utf-8");

    // wait until the stream is actually valid before piping
    readStream.on("open", () => {
        // pipe the response (res) object to the client
        readStream.pipe(res);
    })

    readStream.on("error", (err) => {
        res.end(err);
    })
})

server.listen(port);
