const express = require("express");
const app = express();
const port = 3000;
const tasksRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
// get environment variable
require("dotenv").config();


// middleware
app.use(express.json());


// routes
app.use("/api/v1/tasks", tasksRoute);


// only run the server if db connection is successfully established
(async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port);
        console.log(`Database connected. Server listening on port ${port}`);
    } catch (err) {
        console.error(err);        
    }
})();
