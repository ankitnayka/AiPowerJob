import JobSeeker from '../models/jobseeker.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



// Signup Controller
export const signupJobSeeker = async (req, res) => {
    const { name, email, password ,phoneNumber} = req.body;

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
            name,
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
export const updateJobSeekerProfile = async (req, res) => {
    const { skills, experience, resume, bio,name,email } = req.body;
    const jobSeekerId = req.id;

    try {
        // Find the Job Seeker by ID
        const jobSeeker = await JobSeeker.findById(jobSeekerId);
        if (!jobSeeker) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update profile fields
        if (skills) {
            if (Array.isArray(skills)) {
                jobSeeker.profile.skills = [...new Set(
                    skills.map(skill => skill.trim()).filter(skill => skill.length > 0)
                )];
            } else if (typeof skills === 'string') {
                jobSeeker.profile.skills = [...new Set(
                    skills.split(",").map(skill => skill.trim()).filter(skill => skill.length > 0)
                )];
            } else {
                return res.status(400).json({ message: 'Invalid format for skills' });
            }
        }
        
        if (experience) jobSeeker.profile.experience = experience;
        if (resume) jobSeeker.profile.resume = resume;
        if (bio) jobSeeker.profile.bio = bio;
        if(name) jobSeeker.name=name;
        if(email) jobSeeker.email=email;


        // Save changes
        await jobSeeker.save();

        // Return success response
        res.status(200).json({
            message: 'Profile updated successfully',
            jobSeeker: jobSeeker.toJSON(),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};

