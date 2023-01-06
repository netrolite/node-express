const mongoose = require("mongoose");

function connectDB(url) {
    // returns a promise
    return mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
}

module.exports = connectDB;