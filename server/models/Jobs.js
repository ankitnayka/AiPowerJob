import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String },
  jobType:{type:String,enum:['Full-time','Part-time','Remote']},
  location: { type: String},
  status:{type: String,enum:["open","closed"]},
  datePosted:{type:Date},
  numberofApplicant:[{type:mongoose.Schema.Types.ObjectId,ref:"JobSeeker"}],
  salary: { type: Number},
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "Employer", required: true },
},{timestamps:true});

const Jobs = mongoose.model("Jobs", jobSchema);
export default Jobs;
