const express = require("express");
const router = express.Router();
const {
    getAllTasks,
    postTask,
    getTask,
    patchTask,
    deleteTask,
    deleteAllTasks
} = require("../controllers/tasks");

router.route("/")
    .get(getAllTasks)
    .post(postTask)
    .delete(deleteAllTasks);

router.route("/:taskId")
    .get(getTask)
    .patch(patchTask)
    .delete(deleteTask);

module.exports = router;