let { people } = require("../data");


function getPeople(req, res) {
    res.status(200);
    return res.json({ data: people });
}


function getPerson(req, res) {
    const { id } = req.params;
    const person = people.find(person => person.id === Number(id));

    if (!person) {
        res.status(404);
        res.json({ error: "No person with such name" });
    }
    res.status(200);
    res.json(person);
}


function postPerson(req, res) {
    const { name } = req.body;
    
    if (!name) {
        res.status(400);
        return res.json({ error: "Name not provided" });
    }
    res.status(201);
    return res.json({ data: name })
}


function putPerson(req, res) {
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
}


function deletePerson(req, res) {
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
}


module.exports = {
    getPeople,
    getPerson,
    postPerson,
    putPerson,
    deletePerson
}