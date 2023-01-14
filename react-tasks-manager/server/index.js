const express = require("express");
const app = express();
const connectDB = require("./db/connectDB");
require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const tasksRoute = require("./routes/tasks");


app.get("/", (req, res) => res.status(200).end());

app.use(express.json());
app.use("/api/tasks", tasksRoute);

app.use(errorHandler);

// line above must end with a semicolon
(async () => {
    try {
        const { MONGODB_URI, PORT } = process.env;
        await connectDB(MONGODB_URI);
        app.listen(PORT)
        console.log(`Database connected. Server listening on port ${PORT}`)
    } catch (err) {
        next(err);
    }
})();

