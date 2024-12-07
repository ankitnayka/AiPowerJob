import mongoose from 'mongoose';

const jobSeekerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
        skills: [String],
        experience: Number,
        resume: String,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date, // The token expiration time
});

const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);
export default JobSeeker;
