require('dotenv').config();
require('express-async-errors');
const helmet = require("helmet");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const rateLimiterOptions = require("./config/rateLimiterOptions");
const express = require('express');
const app = express();
const connectDB = require("./db/connectDB");
const jobsRouter = require("./routers/jobs");
const authRouter = require("./routers/auth");
const authorize = require("./middleware/authorize");
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(rateLimit(rateLimiterOptions));
app.use(cors(corsOptions));


// routes
app.get('/', (req, res) => res.status(200).end());
app.use("/api/auth", authRouter);
app.use("/api/jobs", authorize, jobsRouter);

app.use(notFound);
app.use(errorHandler);


(async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(port);
    console.log(`DB connected. Listening on port ${port}`);
  } catch (error) {
    console.log(error);
  }
})();
