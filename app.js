const express = require("express");
const app = express();
let { people } = require("./data");

app.use(express.static("./methods-public"));

app.get("/api/people", (req, res) => {
    res.status(200);
    return res.json({ data: people });
})


app.use(express.urlencoded({ extended: true }));
app.post("/login", (req, res) => {
    const { name } = req.body;
    console.log(req.body);
    if (!name) {
        res.status(400);
        return res.json({ error: "Name not provided" });
    }

    res.status(201);
    return res.json({ username: name, id: Math.floor(Math.random() * 100000) })
})


app.use(express.json());
app.post("/api/people", (req, res) => {
    console.log("post /api/people");
    const { name } = req.body;
    
    if (!name) {
        res.status(400);
        return res.json({ error: "Name not provided" });
    }
    res.status(201);
    return res.json({ data: name })
})

app.get("/api/people/:personID", (req, res) => {
    const id = parseInt(req.params.personID)
    const person = people.find(person => person.id === id);

    if (!person) return res.status(404).json({ error: "No person with such ID" });
    return res.status(200).json(person);
})


app.listen(5000);
