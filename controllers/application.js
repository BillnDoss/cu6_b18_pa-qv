/*
    INSTRUCTION: setup the controller functions to handle job applications
    - getApplicationsByJob - Retrieve all applications for a specific job (use `populate()` to get job details)
    - createApplication - Create a new application for a job (ensure no duplicate applications for the same email and job)
*/

const Application = require("../models/application");
const Job = require ('../models/job')

exports.getApplicationByJob = async (req, res) => {
    const allJobsByApplication = await Application.find({ job: req.query.job }).populate("job");
    res.json(allJobsByApplication);
};

exports.createApplication = async (req, res) => {
    try {
        const existingEmail = await Application.findOne({ job: req.body.email });
        if (existingEmail) {
            return res.status(409).json({ error: "You cannot apply to the same job twice!" });
        }
        const newApplication = new Application(req.body);
        await newApplication.save();
        res.status(201).json(newApplication);
    } catch (err) {
        res.status(500).json(err);
    }
};
