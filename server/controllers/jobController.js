// controllers/jobController.js
import Job from '../models/Job.js';


// Create Job (Only accessible to employers)
export const createJob = async (req, res) => {
  try {
    const { title, description, location, salary } = req.body;

    // Validation for required fields
    if (!title || !description || !location || !salary) {
      return res.status(400).json({
        message: 'All fields are required',
        success: false,
      });
    }

    // Create a new job listing
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      employer: req.id, // Store the employer's user ID
    });

    // Save job to the database
    await newJob.save();

    return res.status(201).json({
      message: 'Job posted successfully!',
      success: true,
      job: newJob,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error posting job. Please try again later.',
      success: false,
    });
  }
};

// Get All Jobs (Accessible by everyone)
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('employer', 'name email');  // Populate employer details in the job response
    return res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error fetching jobs.',
      success: false,
    });
  }
};



