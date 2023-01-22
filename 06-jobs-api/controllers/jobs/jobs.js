async function getAllJobs(req, res) {
    res.send("All jobs");
}

async function getJob(req, res) {
    res.send("Single job");
}

async function addJob(req, res) {
    res.send("Add job");
}

async function patchJob(req, res) {
    res.send("Update job");
}

async function deleteJob(req, res) {
    res.send("Delete job");
}


module.exports = {
    getAllJobs,
    getJob,
    addJob,
    patchJob,
    deleteJob
}