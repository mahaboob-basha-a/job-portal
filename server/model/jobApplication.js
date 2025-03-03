const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Company ID from job
    company: { type: String, required: true }, // Company name
    title: { type: String, required: true }, // Job title
    location: { type: String, required: true }, // Job location
    date: { type: Date, default: Date.now }, // Applied date
    status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' }, // Application status
    logo: { type: String }, // Company logo (image URL)
  },
  { timestamps: true }
);

const jobApplication = mongoose.model('JobApplication', jobApplicationSchema);
module.exports = jobApplication;
