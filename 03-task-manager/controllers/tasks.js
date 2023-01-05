function getAllTasks(req, res) {
    res.send("List of all tasks");
}


function getTask(req, res) {
    res.send("Task");
}


function createTask(req, res) {
    res.send("Created new task");
}


function updateTask(req, res) {
    res.send("Update task");
}


function deleteTask(req, res) {
    res.send("Delete task");
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}