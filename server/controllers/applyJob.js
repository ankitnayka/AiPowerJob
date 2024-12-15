import cloudinary from '../cloudinery/cloudinary.js'
import getDataUri from '../cloudinery/datauri.js'
import Application from '../models/Application.js';
import Jobs from '../models/Jobs.js';



export const applyJob = async (req, res) => {
  try {

    const { jobId } = req.params;
    const { name, email, coverLetter } = req.body;
    const jobseekerId = req.id

    console.log("jobseekr",jobseekerId   );
    console.log("jobId",jobId   );

    if (!req.files || !req.files.resume) {
      return res.status(400).json({ message: "Resume file is required." });
    }
    // console.log(req.files);

    let resumeUrl;
    if (req.files && req.files.resume) {
      const resume = req.files.resume[0];
      const resumeDataUri = getDataUri(resume);


      const uploadResult = await cloudinary.uploader.upload(resumeDataUri.content, {
        resource_type: 'raw',
        folder: 'resumes',
      });

      console.log("upload", uploadResult);

      resumeUrl = uploadResult.secure_url;
    }

    const newApplication = await Application.create({
      jobId,
      applicant: jobseekerId,
      name,
      email,
      coverLetter,
      resumeUrl
    })


    const job = await Jobs.findByIdAndUpdate(jobId,
      { $addToSet: { numberofApplicant: jobseekerId } }, // Prevent duplicates
      { new: true }
    )
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    return res.status(200).json({
      message: "Application submitted successfully!",
      application: newApplication,
    });

  } catch (error) {
    console.log("Internal server error bansri");
    return res.status(500).json({
      message: "Internal server Error"
    })
  }
}