const express = require("express");
const app = express();
const port = 3000;
const tasksRoute = require("./routes/tasks");


// middleware
app.use(express.json());


// routes
app.use("/api/v1/tasks", tasksRoute);


app.listen(port, (err) => {
    if (err) return console.error(err);
    console.log(`Running on port ${port}`);
});