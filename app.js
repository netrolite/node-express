const express = require("express");
const app = express();
let { people } = require("./data");

app.use(express.static("./methods-public"));

app.get("/api/people", (req, res) => {
    res.status(200);
    return res.json({ data: people });
})


app.use("/login", express.urlencoded({ extended: false }));
app.post("/login", (req, res) => {
    res.set({ "Content-Type": "text/plain" });
    const user = people.find(person => person.name === req.body.name);

    if (user) {
        res.status(200);
        res.send(`Welcome, ${user.name}`);
    }
    else {
        res.status(403);
        res.send("Name not registered");
    }
})


app.use("/api/people", express.json());
app.post("/api/people", (req, res) => {
    console.log("post /api/people");
    const { name } = req.body;
    
    if (!name) {
        res.status(400);
        return res.json({ data: "Please provide a name" });
    }
    res.status(201);
    return res.json({ data: name })
})


app.listen(5000);
