import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "JobSeeker", required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  name: { type: String, required: true, },
  email: { type: String, required: true, },
  coverLetter: { type: String, required: false, },
  resumeUrl: { type: String, required: true, },
  appliedAt: { type: Date, default: Date.now, },
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
