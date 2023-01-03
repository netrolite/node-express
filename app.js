const express = require("express");
const morgan = require("morgan");
const app = express();
const logInfo = require("./logInfo")

app.use("/api/products", logInfo);

app.get("/", (req, res) => {
    res.send("This is the home page");
})

app.get("/about", (req, res) => {
    res.send("This is the about page");
})

app.get("/api/products", (req, res) => {
    res.status(200);
    res.send("authorized");
})


app.get("/api/items", (req, res) => {
    res.send("Items");
})

app.listen(5000);