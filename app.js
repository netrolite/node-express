const express = require("express");
const app = express();
let { people } = require("./data");

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/people", (req, res) => {
    res.status(200);
    return res.json({ data: people });
})

app.get("/api/people/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const person = people.find(person => person.id === id);

    if (!person) {
        res.status(404);
        res.json({ error: "No person with such name" });
    }
    res.status(200);
    res.json(person);
})

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


app.put("/api/people/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const name = req.body.name;
    console.log(id, name);

    const person = people.find(person => person.id === id);
    if (!person) {
        res.status(404);
        return res.json({ error: "No such person" });
    }
    // making a deep copy
    const updatedPerson = JSON.parse(JSON.stringify(person));
    updatedPerson.name = name;

    res.status(200);
    return res.json({ data: { "person": person, "updatedPerson": updatedPerson } });
})


app.listen(5000);
