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





// routes
app.use("/api/v1/tasks", tasksRoute);


app.get('/', (req, res) => {
    res.status(200).end();
}); // <-- this semicolon is required before IIFE func


// 404 not found (must go after all other routes)
app.use(notFound);


(async () => {
    try {
        // use VPN!!!
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, console.log(`Database connected. Server listening on port ${port}`));
    } catch (err) {
        console.error(err);
    }
})();
