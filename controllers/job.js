/*
    INSTRUCTION: setup the job controller with the following functions:
    - getJobs - Retrieve all jobs (use `populate()` to get employer details)
    - getJob - Retrieve a specific job (use `populate()` to get employer details)
    - addNewJob - Add a new job
    - updateJob - Update a job
    - deleteJob - Delete a job
*/

const Job = require("../models/job");

exports.getJobs = async (req, res) => {
    const allJobs = await Job.find({}).populate("employer");
    res.json(allJobs);
};

exports.getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate("employer");
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.json(job);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.addNewJob = async (req, res) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJob);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteJob = async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json(err);
    }
};
