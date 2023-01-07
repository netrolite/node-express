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
        // find all tasks
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (err) {
        handleError(err);   
    }
}


async function getTask(req, res) {
    const done = req.params.id;
    if (!isNaN(done)) {
        console.log(`${done} is a number`);
    }

    const person = {
        oldness: 9,
        tallness: 180,
        thickness: 100,
        address: {
            street: "Main St",
            houseNumber: 44,
            tenants: {
                amount: 10,
                loud: true
            }
        }
    }

    const { address: { tenants: { amount: number }}} = person;
    console.log(number);
    
    

    res.json("response");
    // try {
    //     // find task with the provided name
    //     const task = await Task.findOne({ done: done });
    //     res.status(200).json(task);
    // } catch (err) {
    //     handleError(err);
    // }
}


async function postTask(req, res) {
    try {
        // create 1 new task from data in body
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (err) { handleError(err); }
}


function patchTask(req, res) {
    res.send("Patched a task");    
}


function deleteTask(req, res) {
    res.send("Deleted a task");
}


function handleError(err, res) {
    res.status(500);
    res.json({ err });
}

module.exports = {
    getTasks,
    getTask,
    postTask,
    patchTask,
    deleteTask
}