import mongoose from 'mongoose';

const jobSeekerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    profile: {
        skills: [String],
        experience: Number,
        bio :String,
        resume :{type:String} ,//URL to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
        profilePhoto:{
            type:String,
            default:""
        }
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date, // The token expiration time
},{timestamps:true});

const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);
export default JobSeeker;
