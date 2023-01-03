const express = require("express");
const app = express();
const middleware = require("./middleware");

app.use("/api", middleware);
app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.get("/", (req, res) => {
    res.send("This is the home page");
})

app.get("/about", (req, res) => {
    res.send("This is the about page");
})

app.get("/api/products", (req, res) => {
    res.send("Products");
})


app.get("/api/items", (req, res) => {
    res.send("Items");
})

app.listen(5000);