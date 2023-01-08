const express = require("express");
const app = express();
const port = 3000;

app.get("/api", (req, res) => {
    console.log("hello");
    res.status(200).json({ data: ["hello", "world"]})
})

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log(`Server listening on port ${port}`);
});