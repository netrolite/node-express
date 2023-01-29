const Job = require("../models/Job");
const { NotFoundError } = require("../errors");


async function getAllJobs(req, res) {
    const { limit } = req.body;
    const { userId } = req.user;

    // only find jobs created by the current user
    let jobs = Job.find({ createdBy: userId });
    if (typeof limit === "number") jobs.limit(parseInt(limit));
    else if (limit !== "unlimited") jobs.limit(5);

    jobs = await jobs;
    res.status(200).json({ amount: jobs.length, jobs });
}


async function getJob(req, res) {
    const { id: jobId } = req.params;
    const { userId } = req.user;

    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    });

    if (!job) throw new NotFoundError("Not found");

    res.status(200).json(job);
}


async function addJob(req, res) {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(201).json({ job });
}


async function patchJob(req, res) {
    const { id: jobId } = req.params;
    const { userId } = req.user;

    // findOneAndUpdate returns the updated document
    // updateOne only updates the document without returning it
    const updatedJob = await Job.findOneAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { runValidators: true, new: true }
    )

    if (!updatedJob) throw new NotFoundError("Not found");

    res.status(200).json(updatedJob);
}

async function deleteJob(req, res) {
    const { id: jobId } = req.params;
    const { userId } = req.user;

    const deletedUser = await Job.findOneAndDelete(
        { _id: jobId, createdBy: userId }
    )

    if (!deletedUser) throw new NotFoundError("Not found");

    res.status(200).json(deletedUser);
}


module.exports = {
    getAllJobs,
    getJob,
    addJob,
    patchJob,
    deleteJob
}