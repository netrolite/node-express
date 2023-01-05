const os = require("os");
const express = require("express");
const app = express();
const peopleRoute = require("./routes/api/people");
const authRoute = require("./routes/auth");
const { people } = require("./data");
const port = 5000;


// middleware
app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/api/people", peopleRoute);
app.use("/login", authRoute);

// path parameter
// localhost:5000/users/:userId

// query parameter
// localhost:5000/users?admin=true

app.get("/users", logger, auth, (req, res) => {
    console.log("GET /users");
    res.status(200);
    res.json(people);
});

function auth(req, res, next) {
    console.log("auth start");
    const bodyLen = Object.keys(req.body).length;
    const { admin } = bodyLen ? req.body : req.query;
    let isAdmin;

    // only accept strings and booleans
    if (typeof admin === "string") {
        isAdmin = admin.toLowerCase() === "true";
    }
    else if (typeof admin === "boolean") {
        isAdmin = admin;
    }

    if (isAdmin) {
        console.log("before next");
        next();
        console.log("after next");
        return;
    } 
    res.status(401);
    res.send("Only admins can access this page");
};

function logger(req, res, next) {
    console.log("logger start");
    next();
    console.log("logger end");
}


app.listen(port, (err) => {
    if (err) console.error(err);
    console.log(`Server listening on port ${port}`)
})
