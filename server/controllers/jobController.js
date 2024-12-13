import Jobs from '../models/Jobs.js';



export const createJob = async (req, res) => {
  try {
    const { jobTitle, jobDescription, location, salary } = req.body;

    const employerId=req.employerId;
    if (!jobTitle ) {
      return res.status(400).json({
        message: 'Title fields are required',
        success: false,
      });
    }

    const newJob = new Jobs({
      jobTitle,
      jobDescription,
      location,
      salary,
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
  try {
    const employerId=req.employerId
    console.log("REquest",req.employerId);
    
    const jobs = await Jobs.find({employer:employerId})  // Populate employer details in the job response
    return res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error fetching jobs.',
      success: false,
    });
  }
};


export const updateJobDetails=async(req,res)=>{
  try {
    const id=req.params.id
    const {jobTitle,jobDescription,location,status,datePosted,salary}=req.body
    console.log("id",id);
    
    const job=await Jobs.findById(id)
    
    
    if(!job){
      return res.status(400).json({
        message:"Job not found",
        success:false
      })
    }
    console.log("job title",status);

      if(jobTitle) job.jobTitle=jobTitle
      if(jobDescription) job.jobDescription=jobDescription
      if(location) job.location=location
      if(status) job.status=status
      if(datePosted) job.datePosted=datePosted
      if(salary) job.salary=salary

      // const updateJob=await Jobs.findByIdAndUpdate(job._id,{
      //   jobTitle,jobDescription,location,status,datePosted,salary
      // },{new:true})

      const updatedJob = await job.save();

      res.status(200).json({
        messagge:"Job Details Update Successfully !!",
        success:true,
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



export const deleteJob=async(req,res)=>{
  try {
    const {id}=req.params;

    const job =await Jobs.findById(id)
    if(!job){
      return res.status(400).json({
        message:"Job not found",
        success:false
      })
    }

    const deleteJob=await Jobs.findByIdAndDelete(id)

    if(!deleteJob){
      return res.status(400).json({
        message: "Job not found",
      })
    }

    res.status(200).json({
      message:"Job Deleted Successfully !!",
      success:true
    })


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error delete job. Please try again later.',
      success: false,
    });
  }
}