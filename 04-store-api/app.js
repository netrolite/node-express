const express = require("express");
const app = express();
require("express-async-errors");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT;
const connectDB = require("./db/connectDB");
const notFound = require("./middleware/notFound");
const errHandler = require("./middleware/errHandler");
const productsRoute = require("./routes/products");

// middleware
app.use(express.json());

// routes
app.use("/api/products", productsRoute);

app.use(notFound);
app.use(errHandler);

// connect DB & start listening
(async () => {
    try {
        console.time("Time elapsed");

        await connectDB(mongoURI);
        app.listen(port);
        console.log(`DB connected. Port ${port}`);
        
        console.timeEnd("Time elapsed");
    } catch (err) {
        console.log(err);
    }
})();


