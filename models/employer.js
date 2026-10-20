/*
    INSTRUCTION: setup the employer schema according to the following requirements:
    - name: (String, required)
    - industry: (String) - Industry or business sector of the employer
    - email: (String) - Contact email for the employer's hiring team
*/

const mongoose = require("mongoose");

const EmployerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
    },
    email: {
        type: String,
    },
});

const Employer = mongoose.model("Employer", EmployerSchema);
module.exports = Employer;
