const Job = require("../models/Job");

async function getAllJobs(req, res) {
    const { limit } = req.body;
    const { userId } = req.user;

    // only find jobs created by the current user
    let jobs = Job.find({ createdBy: userId });
    if (typeof limit === "number") jobs.limit(parseInt(limit));
    else if (limit !== "unlimited") jobs.limit(5);

    jobs = await jobs;
    res.status(200).json({ resultsAmount: jobs.length, jobs });
}

async function getJob(req, res) {
    res.send("Get 1 job")
}

async function addJob(req, res) {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(201).json({ job });
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