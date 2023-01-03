const express = require("express");
const app = express();
let { people } = require("./data");

app.use(express.static("./methods-public"));

app.get("/api/people", (req, res) => {
    res.status(200);
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify({ ok: true, data: people }, null, 2))
})

app.listen(5000);
