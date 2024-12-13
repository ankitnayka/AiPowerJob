import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String },
  location: { type: String},
  status:{type: String,enum:["open","closed"]},
  datePosted:{type:Date},
  numberofApplicant:[{type:mongoose.Schema.Types.ObjectId,ref:"JobSeeker"}],
  salary: { type: String},
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "Employer", required: true },
},{timestamps:true});

const Jobs = mongoose.model("Jobs", jobSchema);
export default Jobs;
