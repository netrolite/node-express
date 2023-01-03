const express = require("express");
const app = express();
let { people } = require("./data");

app.use(express.static("./methods-public"));

app.get("/api/people", (req, res) => {
    res.status(200);
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify({ ok: true, data: people }, null, 2))
})

app.use(express.urlencoded({ extended: false }));
app.post("/login", (req, res) => {
    const { name } = req.body;

    // if name is provided
    if (name) {
        const person = people.find(person => person.name === name);
        // if name is provided and registered
        if (person) {
            console.log(person);
            res.status(200);
            res.send(`Welcome, ${name}`)
        }
        else {
            // if name is provided, but not registered
            // HTTP code forbidden
            res.status(403);
            res.send("Name not registered");
        }
    }
    // if name is not provided
    else {
        // HTTP code unauthorized (lacks required credentials)
        res.status(401);
        res.send("Please provide a name");
    }
})

// res.set allows to set multiple headers at once
// res.setHeader allows to only set 1 header at a time
app.use(express.json());
app.post("/api/people", (req, res) => {
    res.status(201);
    res.send("Created");
    console.log(req.body);
})


app.listen(5000);
