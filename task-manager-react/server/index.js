const fs = require("fs");
const express = require("express");
const app = express();
const port = 5000;
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/connect");
const tasksRoute = require("./routes/tasks");
const notFound = require("./middleware/notFound");


// Middleware is any function that has access to "req" and "res" object and "next" function

// middleware
app.use(cors({
    origin: "https://task-manager-p1gn.onrender.com"
}))
app.use(express.json());


// routes (middleware)
app.use("/api/v1/tasks", tasksRoute);


// render hosting needs the root request to be complete (when end() is called)
app.get('/', (req, res) => {
    res.status(200).end();
});


// 404 not found (must go after all other routes)
// middleware
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
