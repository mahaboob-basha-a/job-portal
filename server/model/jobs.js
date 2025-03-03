const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    level: { type: String, required: true },
    companyId: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      image: { type: String }, // Assuming company_icon is a URL
    },
    description: { type: String, required: true }, // Supports HTML content
    salary: { type: Number, required: true },
    date: { type: Number, required: true }, // Assuming this is a timestamp
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const jobs = mongoose.model('Job', jobSchema);
module.exports = jobs;
