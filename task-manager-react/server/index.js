const express = require("express");
const app = express();
const port = 5000;
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/connect");
const tasksRoute = require("./routes/tasks");
const notFound = require("./middleware/notFound");


// middleware
app.use(cors({
    origin: "https://task-manager-p1gn.onrender.com"
}))
app.use(express.json());


// middlware. Middleware is any function that has access to "req" and "res" object and "next" function
// this one clearly does
app.get("/test", (req, res, next) => {
    console.log("test 1");
    next();
})

// middlware
app.get("/test", (req, res, next) => {
    console.log("test 2");
    res.send("my second response");
    // express' built-in middleware catches the error and the server doesn't crash but sends a 500 response
    throw new SyntaxError("BROKEN");
})


// routes (middleware)
app.use("/api/v1/tasks", tasksRoute);


// this is also middleware
app.get('/', (req, res) => {
    res.status(200).end();
});


// this is again middleware
// 404 not found (must go after all other routes)
app.use(notFound); // <-- this semicolon is required before IIFE


(async () => {
    try {
        // use VPN!!!
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, console.log(`Database connected. Server listening on port ${port}`));
    } catch (err) {
        console.error(err);
    }
})();
