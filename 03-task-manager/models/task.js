const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must provide a name"],
        trim: true,
        minlength: [2, "name cannot be shorter than 2 characters"],
        maxlength: [50, "name cannot be longer than 50 characters"],
        lowercase: true
    },
    done: {
        type: Boolean,
        default: false
    }
})

// model === collection
module.exports = mongoose.model("Task", TaskSchema);