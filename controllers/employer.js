/*
    INSTRUCTION: setup the employer controller with the following functions:
    - getEmployers - Retrieve all employers
    - getEmployer - Retrieve a specific employer
    - addNewEmployer - Add a new employer
    - updateEmployer - Update an employer
    - deleteEmployer - Delete an employer
*/

const Employer = require("../models/employer");

exports.getEmployers = async (req, res) => {
    const allEmployers = await Employer.find({});
    res.json(allEmployers);
};

exports.getEmployer = async (req, res) => {
    try {
        const employer = await Employer.findById(req.params.id);
        if (!employer) return res.status(404).json({ message: "Employer not found" });
        res.json(employer);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.addNewEmployer = async (req, res) => {
    try {
        const newEmployer = new Employer(req.body);
        await newEmployer.save();
        res.status(201).json(newEmployer);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateEmployer = async (req, res) => {
    try {
        const updatedEmployer = await Employer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEmployer);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteEmployer = async (req, res) => {
    try {
        await Employer.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json(err);
    }
};
