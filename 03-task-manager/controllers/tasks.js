const Task = require("../models/Task");

function getTasks(req, res) {
    res.send("All tasks");    
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