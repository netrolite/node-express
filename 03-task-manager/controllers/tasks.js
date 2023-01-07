const Task = require("../models/Task");

// Model.deleteMany()
// Model.deleteOne()
// Model.find()
// Model.findById()
// Model.findByIdAndDelete()
// Model.findByIdAndRemove()
// Model.findByIdAndUpdate()
// Model.findOne()
// Model.findOneAndDelete()
// Model.findOneAndRemove()
// Model.findOneAndReplace()
// Model.findOneAndUpdate()
// Model.replaceOne()
// Model.updateMany()
// Model.updateOne()


async function getTasks(req, res) {
    try {
        const tasks = await Task.find({});
        res.status(200);
        res.json({ tasks });
    } catch (err) {
        res.status(500);
        res.json({ err });
    }
}

function getTask(req, res) {
    res.send("One task");    
}

async function postTask(req, res) {
    try {
        const task = await Task.create(req.body);
        res.status(201);
        res.json({ task });
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: err });
    }
}

function patchTask(req, res) {
    res.send("Patched a task");    
}

function deleteTask(req, res) {
    res.send("Deleted a task");
}

module.exports = {
    getTasks,
    getTask,
    postTask,
    patchTask,
    deleteTask
}