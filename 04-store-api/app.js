const express = require("express");
const app = express();
// env variables
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT;
// DB
const mongoose = require("mongoose");
const connectDB = require("./db/connectDB");
// middleware
const notFound = require("./middleware/notFound");
const errHandler = require("./middleware/errHandler");
// routes
const productsRoute = require("./routes/products");


// middleware
app.use(express.json());

// routes
app.use("/api/products", productsRoute);

// not found & error resonses
app.use(notFound);
app.use(errHandler);

// connect DB & start listening
(async () => {
    try {
        await connectDB(mongoURI);
        app.listen(port);
        console.log(`DB connected. Port ${port}`);
    } catch (err) {
        console.log(err);
    }
})();


