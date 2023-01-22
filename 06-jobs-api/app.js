require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require("./db/connectDB");
const jobsRouter = require("./routers/jobs");
const authRouter = require("./routers/auth");
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middleware/errorHandler');
const port = process.env.PORT || 5000;

 
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.status(200).send('jobs api');
});
app.use("/api/auth", authRouter);
app.use("/api/jobs", jobsRouter);

app.use(NotFoundError);
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
