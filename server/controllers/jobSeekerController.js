import JobSeeker from '../models/jobseeker.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from '../cloudinery/cloudinary.js'
import getDataUri from '../cloudinery/datauri.js';



// Signup Controller
export const signupJobSeeker = async (req, res) => {
    const { fullName, email, password ,phoneNumber} = req.body;

    try {
        // Check if the user already exists
        const existingUser = await JobSeeker.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new Job Seeker
        const jobSeeker = await JobSeeker.create({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber:phoneNumber
        });

        // Generate token
        const token = jwt.sign({ jobSeekerId: jobSeeker._id }, process.env.SECRET_KEY, { expiresIn: '1d' })

        res.status(201).json({
            message: 'Signup successful',
            userId: jobSeeker._id,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during signup', error: error.message });
    }
};

// Login Controller
export const loginJobSeeker = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Find Job Seeker by email
        const jobSeeker = await JobSeeker.findOne({ email });
        if (!jobSeeker) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(email,password);
        
        // Compare passwords
        const isMatch = await bcrypt.compare(password, jobSeeker.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = jwt.sign({ jobSeekerId: jobSeeker._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        

        res.status(200).cookie("token", token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        }).json({
            message: 'Login successful',
            userId: jobSeeker._id,
            token,
            jobSeeker
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
};

// Logout Controller
export const logoutJobSeeker =async (req, res) => {
    try {
        res.status(200).cookie("token", "", { maxage: 0 }).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error during logout', error: error.message });
    }
};

// Get Profile Controller
export const getJobSeekerProfile = async (req, res) => {
    const jobSeekerId=req.id;
    try {
        console.log("bansari",req.id);
        const jobSeeker = await JobSeeker.findById(jobSeekerId).select('-password');
        if (!jobSeeker) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(jobSeeker);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving profile', error: error.message });
    }
};


// // Update Profile Controller
// export const updateJobSeekerProfile = async (req, res) => {
//     const { skills, experience, resume,bio } = req.body;
//     const jobSeekerId=req.id;

    
//     try {
//         // Find the Job Seeker by their ID (from the JWT token or from params)
//         const jobSeeker = await JobSeeker.findById(jobSeekerId);  // req.user.id should be populated from authentication middleware

//         if (!jobSeeker) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Update the profile fields
//         if (skills) {
//             jobSeeker.profile.skills=skills.split(",").map(skill=>skill.trim())
//         }
//         if (experience) jobSeeker.profile.experience = experience;
//         if (resume) jobSeeker.profile.resume = resume;
//         if (bio) jobSeeker.profile.bio = bio;

//         // Save the updated profile
//         await jobSeeker.save();

//         res.status(200).json({ message: 'Profile updated successfully', jobSeeker });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating profile', error: error.message });
//     }
// };

// Update Profile Controller
// export const updateJobSeekerProfile = async (req, res) => {
//     const { skills, experience, resume, bio,fullName,email } = req.body;
//     const jobSeekerId = req.id;

//     try {
//         // Find the Job Seeker by ID
//         const jobSeeker = await JobSeeker.findById(jobSeekerId);
//         if (!jobSeeker) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Update profile fields
//         if (skills) {
//             if (Array.isArray(skills)) {
//                 jobSeeker.profile.skills = [...new Set(
//                     skills.map(skill => skill.trim()).filter(skill => skill.length > 0)
//                 )];
//             } else if (typeof skills === 'string') {
//                 jobSeeker.profile.skills = [...new Set(
//                     skills.split(",").map(skill => skill.trim()).filter(skill => skill.length > 0)
//                 )];
//             } else {
//                 return res.status(400).json({ message: 'Invalid format for skills' });
//             }
//         }
        
//         if (experience) jobSeeker.profile.experience = experience;
//         if (resume) jobSeeker.profile.resume = resume;
//         if (bio) jobSeeker.profile.bio = bio;
//         if(fullName) jobSeeker.fullName=fullName;
//         if(email) jobSeeker.email=email;

//         if(req.files){

//             if(req.files.resume){
//                     const fileUri=getDataUri(req.files.resume)
//                     const cloudResponse=await cloudinary.uploader.upload(fileUri.content)
                    
                    
//                     jobSeeker.profile.resume=cloudResponse.secure_url
//                 }
//                 if(req.files.profilePhoto){
//                     const fileUri=getDataUri(req.files.profilePhoto)
//                     const cloudResponse=await cloudinary.uploader.upload(fileUri.content)
               
//                 jobSeeker.profile.profilePhoto = cloudResponse.secure_url
//             }
//         }

        
      

//         // Save changes
//         await jobSeeker.save();

//         // Return success response
//         res.status(200).json({
//             message: 'Profile updated successfully',
//             jobSeeker: jobSeeker.toJSON(),
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating profile', error: error.message });
//     }
// };




// Update JobSeeker Profile
// export const updateJobSeekerProfile = async (req, res) => {
//     try {
//         const { fullName, email, phoneNumber, bio, experience, skills } = req.body;

//         let profilePhotoUrl;
//         let resumeUrl;

//         // Handle Profile Photo Upload
//         if (req.files && req.files.profilePhoto) {
//             const profilePhoto = req.files.profilePhoto[0];
//             const profilePhotoDataUri = getDataUri(profilePhoto);

//             const uploadResult = await cloudinary.uploader.upload(profilePhotoDataUri.content, {
//                 resource_type: 'image',
//                 folder: 'profile_photos',
//             });

//             profilePhotoUrl = uploadResult.secure_url;
//         }

//         // Handle Resume Upload
//         if (req.files && req.files.resume) {
//             const resume = req.files.resume[0];
//             const resumeDataUri = getDataUri(resume);

//             const uploadResult = await cloudinary.uploader.upload(resumeDataUri.content, {
//                 resource_type: 'raw',
//                 folder: 'resumes',
//             });

//             resumeUrl = uploadResult.secure_url;
//         }

//         // Update user profile logic (using a database model, e.g., JobSeekerModel)
//         const updatedProfile = await JobSeeker.findByIdAndUpdate(
//             req.id,
//             {
//                 fullName,
//                 email,
//                 phoneNumber,
//                 bio,
//                 experience,
//                 skills: skills.split(',').map(skill => skill.trim()),
//                 'profile.profilePhoto': profilePhotoUrl,
//                 'profile.resume': resumeUrl,
//             },
//             { new: true }
//         );

//         res.status(200).json({ message: 'Profile updated successfully', updatedProfile });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error updating profile', error: error.message });
//     }
// };




export const updateJobSeekerProfile = async (req, res) => {
    try {
      const { fullName, email, phoneNumber, bio, experience, skills } = req.body;
  
    console.log("Skills",skills);
    
      const currentProfile = await JobSeeker.findById(req.id);
      if (!currentProfile) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      let profilePhotoUrl;
      let resumeUrl;
  
    
      
      if (req.files && req.files.profilePhoto) {
        const profilePhoto = req.files.profilePhoto[0];
        const profilePhotoDataUri = getDataUri(profilePhoto);
  
        
        if (currentProfile.profile.photo) {
          const oldPhotoPublicId = currentProfile.profile.photo.split('/').pop().split('.')[0]; 
          await cloudinary.uploader.destroy(oldPhotoPublicId); 
        }
  
    
        const uploadResult = await cloudinary.uploader.upload(profilePhotoDataUri.content, {
          resource_type: 'image',
          folder: 'profile_photos',
        });
  
        
        profilePhotoUrl = uploadResult.secure_url;
      }
  

      if (req.files && req.files.resume) {
        const resume = req.files.resume[0];
        const resumeDataUri = getDataUri(resume);
  
        // If there is an existing resume, delete it from Cloudinary
        if (currentProfile.profile.resume) {
          const oldResumePublicId = currentProfile.profile.resume.split('/').pop().split('.')[0]; // Extract the public ID from URL
          await cloudinary.uploader.destroy(oldResumePublicId); // Delete the old resume from Cloudinary
        }
  
        // Upload the new resume to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(resumeDataUri.content, {
          resource_type: 'raw',
          folder: 'resumes',
        });
  
        // Store the new Cloudinary URL for the resume
        resumeUrl = uploadResult.secure_url;
      }
  
      // Update the JobSeeker profile with the new data
      const updatedProfile = await JobSeeker.findByIdAndUpdate(
        req.id, // Assuming `req.id` contains the job seeker ID
        {
          fullName,
          email,
          phoneNumber,
        'profile.bio':bio,
        'profile.skills': skills.split(',').map(skill => skill.trim()),
          'profile.experience':experience,
          skills: skills.split(',').map(skill => skill.trim()), // Split and trim skills
          'profile.profilePhoto': profilePhotoUrl || currentProfile.profile.photo, // If no new photo, retain old photo
          'profile.resume': resumeUrl || currentProfile.profile.resume, // If no new resume, retain old resume
        },
        { new: true } // To return the updated document
      );
  
      // Respond with the updated profile data
      res.status(200).json({
        message: 'Profile updated successfully',
        updatedProfile,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error updating profile',
        error: error.message,
      });
    }
  };