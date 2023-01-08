const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

function connect(uri) {
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = connect;