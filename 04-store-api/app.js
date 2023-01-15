const express = require("express");
const app = express();
const errHandler = require("./middleware/errHandler");
const CustomErr = require("./CustomErr");
// env variables
require("dotenv").config();
const port = process.env.PORT



app.get("/test", (req, res, next) => {
    next(new Error("haha internal server error"));
})

app.use(errHandler);


app.listen(port);
