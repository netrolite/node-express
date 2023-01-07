const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
})

// model === collection
module.exports = mongoose.model("Task", TaskSchema);