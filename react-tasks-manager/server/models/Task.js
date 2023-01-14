const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: [100, "name cannot be longer than 100 characters"]
    },
    done: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Task", TaskSchema);