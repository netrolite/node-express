require('dotenv').config();
require('express-async-errors');
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

// routes
app.get('/', (req, res) => {
  res.status(200).send('jobs api');
});
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
