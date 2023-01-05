const express = require("express");
const router = express.Router();
const { people } = require("../data");


router.post("/", (req, res) => {
    const { name } = req.body;

    if (!name) {
        // bad request
        res.status(400);
        return res.json({ error: "Please provide a name" });
    }

    const person = people.find(person => person.name === name);


    if (!person) {
        // info provided is valid but auth has been refused
        res.status(401);
        return res.json({ error: `${name} is not registered` });
    }

    res.status(201);
    const id = Math.floor(Math.random() * 100000);
    return res.json({ username: name, id: id })
})


module.exports = router;
