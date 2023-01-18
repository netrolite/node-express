const mongoose = require('mongoose')

function connectDB(uri) {
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
}

module.exports = connectDB
