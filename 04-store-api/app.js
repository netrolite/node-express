const express = require("express");
const app = express();
// avoid the need for trycatch blocks (also throw errors instead of calling next())
require("express-async-errors");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT;
const connectDB = require("./db/connectDB");
// middleware
const notFound = require("./middleware/notFound");
const errHandler = require("./middleware/errHandler");
// routes
const productsRoute = require("./routes/products");
const testingRoute = require("./routes/testing");


// middleware
app.use(express.json());

// routes
app.use("/api/products", productsRoute);
app.use("/api/testing", testingRoute);

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


