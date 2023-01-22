const mongoose = require("mongoose");

function connectDB(uri) {
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
}

module.exports = connectDB;