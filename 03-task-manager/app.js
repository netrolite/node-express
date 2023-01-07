const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./db/connect");
const tasksRoute = require("./routes/tasks");
const dotenv = require("dotenv").config();


// middleware
app.use(express.json());


// routes
app.use("/api/v1/tasks", tasksRoute);

(async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        console.log("Database connected");
        app.listen(port);
    } catch (err) {
        console.log(err);
    }
})();



