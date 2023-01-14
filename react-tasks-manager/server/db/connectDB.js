const mongoose = require("mongoose");

// disable deprecation warning
mongoose.set("strictQuery", false);

function connectDB(uri) {
    return mongoose.connect(uri);
}

module.exports = connectDB;