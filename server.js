const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5123;

app.use(express.json());

// INSTRUCTION: setup cors

const corsHandler = cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
    preflightContinue: true,
});

app.use(corsHandler);

// INSTRUCTION: setup MongoDB Connection

mongoose
    .connect("mongodb://localhost:27017/CU6-Exam")
    .then(async () => {
        app.listen(port, () => {});
    })
    .catch((err) => console.error("MongoDB connection error:", err));

// INSTRUCTION: setup routes

const employerRoute = require("./routes/employer");
const jobRoute = require("./routes/job");
const applicationRoute = require("./routes/application");

app.use("/jobs", jobRoute);
app.use("/employers", employerRoute);
app.use("/applications", applicationRoute);

app.get("/", (req, res) => {
    res.send("Good luck with the exam!");
});

// Server listening
app.listen(port, () => console.log(`Server started on port ${port}`));
