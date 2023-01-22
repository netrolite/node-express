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
    .post(addJob)
    .get(getAllJobs);

router.route("/:id")
    .get(getJob)
    .patch(patchJob)
    .delete(deleteJob);


module.exports = router;