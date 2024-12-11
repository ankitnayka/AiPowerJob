import mongoose from 'mongoose'


const employerSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyDescrption:{
        type:String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    location: {
        type: String
    },
    companyLogo: {
        type: String,
    },
    industry: {
        type: String,
    },
})


const Employer=mongoose.model('Employer',employerSchema)
export default Employer