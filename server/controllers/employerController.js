import Employer from '../models/employer.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import getDataUri from '../cloudinery/datauri.js'
import Jobs from '../models/Jobs.js'
import Application from '../models/Application.js'

export const  employerSignup=async(req,res)=>{
    try {
        const {companyName,email,password,contactNumber}=req.body
        

        if(!companyName || !email || !password || !contactNumber){
            return res.status(400).json({
                message:"All fields Required !!",
                success:false
            })
        }

        const existingEmployer=await Employer.findOne({email})
        if(existingEmployer){
            return res.status(400).json({
                message:"Email Already Register !!",
                success:false
            })
        }

        const hashedPassword=await bcrypt.hash(password,10)


        const newEmployer=await Employer.create({
            companyName,
            email,
            password:hashedPassword,
            contactNumber
        })

        const token =jwt.sign({employerId:newEmployer._id},process.env.SECRET_KEY,{expiresIn:'1d'})

        return res.status(200).json({
            message:"Employer Created Successfully",
            employerId:newEmployer._id,
            token
        })


    } catch (error) {
        console.log("error occur on internal serever",error)
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}


export const employerLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;

        if( !email || !password ){
            return res.status(400).json({
                message:"All fields Required !!",
                success:false
            })
        }

        const employer=await Employer.findOne({email})

        if(!employer){
            return res.status(400).json({
                message:"invalid email or password!!",
                success:false
            })
        }

        const isMatch=await bcrypt.compare(password,employer.password)

        if(!isMatch){
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token= jwt.sign(
            {employerId:employer._id},
            process.env.SECRET_KEY,
            {expiresIn:'1d'})


            res.status(200).cookie("employerToken", token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            }).json({
                message: 'Login successful',
                employerId: employer._id,
                token,
                employer
            });
      

        
    } catch (error) {
        console.log("error occur on internal serever",error)
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}

export const employerLogout=async(req,res)=>{
    try {
        return res.status(200).cookie("token","" ,{ maxage: 0 }).json({ message: 'Logged out successfully' })
    } catch (error) {
        console.log("error occur on internal serever",error)
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}


export const employerDetails=async(req,res)=>{
    const employerId=req.employerId
    console.log("detailsCompany",employerId);
    
    try {
        const employer=await Employer.findById(employerId)

        return res.status(200).json({
            employer
        })
    } catch (error) {
        console.log("error occur on internal serever",error)
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}

export const employerUpdate=async(req,res)=>{
    const employerId=req.employerId
    
    
    try {

        const {companyName,email,contactNumber,location,industry,companyDescrption}=req.body;
        // console.log(req.files.companyLogo);
        
        const employer=await Employer.findById(employerId);
        if(!employer){
            return res.status(400).json({
                message:"EMployer not found",
                success:false
            })
        }

        
        let companyLogoUrl;
        if(req.files && req.files.companyLogo){
            const companyLogo = req.files.companyLogo[0];
            const companyLogoDataUri = getDataUri(companyLogo);
            
            if(employer.companyLogo){
                const oldLogoPublicId=employer.companyLogo.split('/').pop().split('.')[0]; 
                await cloudinary.uploader.destroy(oldLogoPublicId); 
            }

            const uploadResult = await cloudinary.uploader.upload(companyLogoDataUri.content, {
                resource_type: 'image',
                folder: 'companyLogo',
              });
              
            companyLogoUrl=uploadResult.secure_url;
        }
      

        if(companyName) employer.companyName=companyName
        if(companyDescrption) employer.companyDescrption=companyDescrption
        if(email) employer.email=email
        if(contactNumber) employer.contactNumber=contactNumber
        if(location) employer.location=location
        if(industry) employer.industry=industry

        const employerUpdate=await Employer.findByIdAndUpdate(employerId,{
                            companyName,
                            email,
                            contactNumber,
                            location,
                            industry
                            ,companyLogo:companyLogoUrl,
                            companyDescrption,
            
        },{new:true})

    console.log(employerUpdate);
    

      
        res.status(200).json({
            message: 'Employer updated successfully Bansari',
            employerUpdate,
          });
    } catch (error) {
        console.log("error occur on internal serever",error)
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}

export const getApplicationsForJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        // const employerId = req.id; 
        const employer=req.employerId
    
    
        const job = await Jobs.findOne({ _id: jobId, employer });
        console.log("employer job",job);
        
        if (!job) {
            return res.status(403).json({ message: "You are not authorized to view these applications." });
        }

        // Fetch all applications for the job
        const applications = await Application.find({ jobId }).select('-__v'); // Exclude __v for cleaner data

        return res.status(200).json({ 
            message: "Applications fetched successfully.",
            applications,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
};
