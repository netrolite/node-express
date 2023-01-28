const Job = require("../models/Job");

async function getAllJobs(req, res) {
    const { limit } = req.body;

    let jobs = Job.find({});
    if (typeof limit === "number") jobs.limit(parseInt(limit));
    else if (limit !== "unlimited") jobs.limit(3);

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