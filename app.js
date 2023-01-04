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
    const { id } = req.params;
    const person = people.find(person => person.id === Number(id));

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
    const { id } = req.params;
    const { name } = req.body;

    const person = people.find(person => person.id === Number(id));
    if (!person) {
        res.status(404);
        return res.json({ error: "No such person" });
    }
    if (!name) {
        res.status(400);
        return res.json({ error: "Please provide a name" })
    }
    if (name.toLowerCase() === "vladimir putin") {
        res.status(403);
        return res.json({ error: "putin not allowed" });
    }
    // making a deep copy
    const updatedPerson = JSON.parse(JSON.stringify(person));
    updatedPerson.name = name;

    res.status(200);
    return res.json({ data: { "person": person, "updatedPerson": updatedPerson } });
})

app.delete("/api/people/:id", (req, res) => {
    const id = Number(req.params.id);

    const filtered = people.filter(person => person.id !== id);

    // always returns false if values aren't converted to JSON because they have different references
    // if arrays are the same
    if (JSON.stringify(filtered) === JSON.stringify(people)) {
        res.status(400);
        return res.json({ "error": "No person with such id" });
    }
    res.status(200);
    res.json(filtered);
})


app.listen(5000);
