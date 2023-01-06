const mongoose = require("mongoose");

// setup document structure
const TaskSchema = new mongoose.Schema({
    name: String,
    completed: Boolean
})

// "Task" in code
// "tasks" in the db
module.exports = mongoose.model("Task", TaskSchema);
