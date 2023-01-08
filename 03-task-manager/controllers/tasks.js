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


async function getAllTasks(req, res) {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (err) {
        handleError(err, res);
    }
}


async function getTaskById(req, res) {
    try {
        const { taskId } = req.params;

        const task = await Task.findOne({ _id: taskId });
        
        if (!task) {
            return res.status(404).json({ msg: `No task with id ${taskId}`});
        }
        res.status(200).json(task);
    } catch (err) {
        handleError(err, res);
    }
}


async function postTask(req, res) {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (err) {
        handleError(err, res);
    }
}


function patchTask(req, res) {
    res.send("Patched a task");    
}


async function deleteTask(req, res) {
    try {
        const { taskId } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskId });
        
        if (!task) {
            return res.status(404).json(task);
        }
        res.status(200).json(task);
    } catch (err) {
        handleError(err, res);
    }
}

async function deleteAllTasks(req, res) {
    try {
        const allTasks = await Task.find({});
        const allIds = allTasks.map(task => task._id);
        const task = await Task.findOneAndDelete({ _id: allIds[0] });

        // using Promise.all() because allIds.map() returns an array
        const deleted = await Promise.all(allIds.map(async id => {
            return await Task.findOneAndDelete({ _id: id });
        }))

        res.status(200).json({ deleted, task });
    } catch (err) {
        handleError(err, res);
    }
}

function handleError(err, res) {
    res.status(500);
    console.log(err);
    res.json({ err });
}

module.exports = {
    getAllTasks,
    getTaskById,
    postTask,
    patchTask,
    deleteTask,
    deleteAllTasks
}