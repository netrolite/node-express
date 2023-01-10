const express = require("express");
const app = express();
const port = 5000;
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/connect");
const tasksRoute = require("./routes/tasks");

// middleware
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasksRoute);

(async () => {
    try {
        // use VPN!!!
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, console.log(`Database connected. Server listening on port ${port}`));
    } catch (err) {
        console.error(err);
    }
})();
