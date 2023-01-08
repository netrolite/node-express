const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: [100, "name cannot be over 100 characters"]
    },
    done: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model("Task", TasksSchema);

module.exports = Task;