const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("./public"));

app.get("/", (req, res) => {
    const filePath = path.resolve(__dirname, "navbar-app/index.html");
    console.log(filePath);
    res.sendFile(filePath);
})

app.all("*", (req, res) => {
    res.status(404);
    res.send("<h1>Page Not Found</h1>");
})

app.listen(5000);