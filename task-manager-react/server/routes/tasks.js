const express = require("express");
const router = express.Router();
const {
    getAllTasks,
    postTask,
    getTask,
    patchTask,
    deleteTask
} = require("../controllers/tasks");

router.route("/")
    .get(getAllTasks)
    .post(postTask);

router.route("/:taskID")
    .get(getTask)
    .patch(patchTask)
    .delete(deleteTask);

module.exports = router;