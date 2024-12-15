import Jobs from '../models/Jobs.js';
import Employer from '../models/employer.model.js'



export const createJob = async (req, res) => {
  try {
    // const employerId=req.employerId
    const employerId = req.employerId;
    const { jobTitle, jobDescription, jobType, location, salary } = req.body;

    if (!jobTitle) {
      return res.status(400).json({
        message: 'Title fields are required',
        success: false,
      });
    }
    console.log("Employer id ", employerId);


    const newJob = new Jobs({
      jobTitle,
      jobDescription,
      location,
      salary,
      jobType,
      employer: employerId,
    });


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
  const employerId = req.employerId
  try {
    console.log("REquest", req.employerId);

    const jobs = await Jobs.find({ employer: employerId })  // Populate employer details in the job response
    return res.status(200).json({ message: "EMployer Jobs", jobs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error fetching jobs.',
      success: false,

    });
  }
};


export const updateJobDetails = async (req, res) => {
  try {
    const id = req.params.id
    const { jobTitle, jobDescription, jobType, location, status, datePosted, salary } = req.body
    console.log("id", id);

    const job = await Jobs.findById(id)


    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false
      })
    }
    console.log("job title", status);

    if (jobTitle) job.jobTitle = jobTitle
    if (jobDescription) job.jobDescription = jobDescription
    if (location) job.location = location
    if (status) job.status = status
    if (jobType) job.jobType = jobType
    if (datePosted) job.datePosted = datePosted
    if (salary) job.salary = salary

    // const updateJob=await Jobs.findByIdAndUpdate(job._id,{
    //   jobTitle,jobDescription,location,status,datePosted,salary
    // },{new:true})

    const updatedJob = await job.save();

    res.status(200).json({
      messagge: "Job Details Update Successfully !!",
      success: true,
      updatedJob
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error update job. Please try again later.',
      success: false,
    });
  }
}



export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Jobs.findById(id)
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false
      })
    }

    const deleteJob = await Jobs.findByIdAndDelete(id)

    if (!deleteJob) {
      return res.status(400).json({
        message: "Job not found",
      })
    }

    res.status(200).json({
      message: "Job Deleted Successfully !!",
      success: true
    })


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error delete job. Please try again later.',
      success: false,
    });
  }
}

//get single job for state management


export const getAlljobsJobseeker = async (req, res) => {
  try {
    const allJobs = await Jobs.find({})

    return res.status(200).json({
      message: "All jobs received !!!",
      allJobs
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error get all  job for jobseeker. Please try again later.',
      success: false,
    });
  }
}

export const getSingleDescription = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Jobs.findById(jobId)

    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false
      })
    }

    return res.status(200).json({
      message: "Job Description here",
      job
    })

  } catch (error) {
    return res.status(500).json({
      message: 'Error get single  job for jobseeker. Please try again later.',
      success: false,
    });
  }
}

export const filterJob = async (req, res) => {
  try {
    const { location, salaryRange, industry } = req.query

    const filter = {};

    if (location) filter.location = location
    if (industry) filter.industry = industry
    if (salaryRange) {
      const [minSalary, maxSalary] = salaryRange.split("-").map(Number)
      filter.salaryRange = { $gte: minSalary, $lte: maxSalary }
    }
    const jobs = await Jobs.find(filter);

    res.status(200).json({
      message: "Jobs fetched successfully!",
      jobs,
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Error get single  job for jobseeker. Please try again later.',
      success: false,
    });
  }
}