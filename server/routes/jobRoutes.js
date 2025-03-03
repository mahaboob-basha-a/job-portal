const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getAllJobs, appliedJobs, applyForJob } = require('../controller/jobDetails');
const jobRouter = express.Router();

jobRouter.get('/all-jobs',getAllJobs);
jobRouter.get('/applied-jobs',authMiddleware,appliedJobs);
jobRouter.post('/apply-for-jobs',authMiddleware,applyForJob);

module.exports = jobRouter;