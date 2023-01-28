const express = require("express");
const router = express.Router();
const {
    getAllJobs,
    getJob,
    addJob,
    patchJob,
    deleteJob
} = require("../controllers/jobs/jobs");


router.route("/")
    .get(getAllJobs)
    .post(addJob);

router.route("/:id")
    .get(getJob)
    .patch(patchJob)
    .delete(deleteJob);


module.exports = router;