const Task = require("../models/Task");


async function getAllTasks(req, res) {
    try {

        const tasks = await Task.find({});
        res.status(200).json(tasks);

    } catch (err) {
        handleErr(err, res);
    }
}


async function postTask(req, res) {
    try {

        const data = req.body;
        const task = await Task.create(data);
        res.status(201).json(task);

    } catch (err) {
        handleErr(err, res);
    }
}


async function getTask(req, res) {
    try {

        const { taskID } = req.params;
        const task = await Task.findOne({ _id: taskID });

        if (!task) {
            return res.status(404).json(null);
        }

        res.status(200);
        res.json(task);

    } catch (err) {
        handleErr(err, res);
    }
}


async function patchTask(req, res) {
    try {

        const { taskID } = req.params;
        const task = await Task.findOneAndUpdate(
            { _id: taskID },
            req.body,
            { new: true }
        )

        if (!task) {
            return res.status(404).json(null);
        }

        res.status(200);
        res.json(task);

    } catch (err) {
        handleErr(err, res);
    }
}


async function deleteTask(req, res) {
    try {

        const { taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });

        if (!task) {
            return res.status(404).json(null);
        }

        res.status(200);
        res.json(task);

    } catch (err) {
        handleErr(err, res);    
    }
}


function handleErr(err, res) {
    console.error(err);
    res.status(500);
    res.json({ err });
}


module.exports = {
    getAllTasks,
    postTask,
    getTask,
    patchTask,
    deleteTask
}