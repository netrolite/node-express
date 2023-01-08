const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must provide a name"],
        trim: true,
        maxlength: [100, "name cannot be longer than 100 characters"],
        lowercase: true
    },
    done: {
        type: Boolean,
        default: false
    }
})

// model === collection
module.exports = mongoose.model("Task", TaskSchema);