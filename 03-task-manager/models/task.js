const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must provide a name"],
        trim: true,
        maxlength: [20, "name cannot be longer than 40 characters"],
    },
    done: {
        type: Boolean,
        default: false
    }
})

// model === collection
module.exports = mongoose.model("Task", TaskSchema);