// model
const Task = require("../models/Task");
// async wrapper so I don't have to use trycatch
const async = require("../middleware/asyncWrapper");
// custom API error
const ApiError = require("../errors/ApiError");


const getAllTasks = async(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
})

const postTask = async(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json(task);
})

const getTask = async(async (req, res, next) => {
    const task = await Task.findOne({ _id: req.params.taskId });

    if (!task) return next(new ApiError("Not found", 404));

    res.status(200).json(task);
})

const patchTask = async(async (req, res, next) => {
    // replace only the provided values
    const task = await Task.findOneAndUpdate(
        { _id: req.params.taskId },
        req.body,
        { new: true } // return updated document
    )
    
    console.log(task);
    if (!task) {
        console.log("task is falsy");
        return next(new ApiError("Not found", 404));
    }

    res.status(200).json(task);
})

const deleteTask = async(async (req, res, next) => {
    const task = await Task.findOneAndDelete({ _id: req.params.taskId });

    if (!task) return next(new ApiError("Not found", 404));
    console.log("delete task");
    res.status(200).json(task);
})

const deleteAllTasks = async(async (req, res) => {
    const tasks = await Task.find({});
    tasks.forEach(async (task) => {
        await Task.findOneAndDelete({ _id: task._id });
    })
    res.status(200).json(tasks);
})


module.exports = {
    getAllTasks,
    postTask,
    getTask,
    patchTask,
    deleteTask,
    deleteAllTasks
}