const JobApplication = require('../model/jobApplication');
const jobs = require('../model/jobs');

const getAllJobs = async (req,res)=>{
    try {
        const allAvailableJobs = await jobs.find();
        return res.status(200).json({allJobs: allAvailableJobs})
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const appliedJobs = async (req,res)=>{
    try {
        const userId = req.user.userId; // Extract userId from token (middleware should handle this)

        // Fetch jobs applied by the user
        const appliedJobs = await JobApplication.find({ userId }).sort({ date: -1 });

        if (appliedJobs.length === 0) {
            return res.status(404).json({ message: "No applied jobs found" });
        }

        return res.status(200).json({ appliedJobs });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const applyForJob = async (req, res) => {
    try {
        const userId = req.user.userId; // Extract userId from authenticated token
        const { companyId, company, title, location, date, status, logo } = req.body;

        if (!companyId || !company || !title || !location || !date || !status || !logo) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new job application entry
        const newApplication = new JobApplication({
            userId,
            companyId,
            company,
            title,
            location,
            date,
            status,
            logo
        });

        // Save application to database
        await newApplication.save();

        return res.status(201).json({ message: "Job application submitted successfully" });
    } catch (error) {
        console.log('apply new job',error)
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {appliedJobs,applyForJob,getAllJobs};