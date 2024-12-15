import express from 'express';
import {
  loginJobSeeker,
  logoutJobSeeker,
  signupJobSeeker,
  getJobSeekerProfile,
  updateJobSeekerProfile,
} from '../controllers/jobSeekerController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { upload } from '../middleware/multer.js';
import { applyJob } from '../controllers/applyJob.js';


const router = express.Router();

router.post('/signup', signupJobSeeker);

router.post('/login', loginJobSeeker);

router.get('/logout', logoutJobSeeker);

router.get('/profile', isAuthenticated, getJobSeekerProfile);

// router.put(
//   '/updateprofile',
//   isAuthenticated,
//   upload.fields([
//     { name: 'resume', maxCount: 1 },
//     { name: 'profilePhoto', maxCount: 1 },
//   ]),
//   uploadToCloudinary,  // Use the Cloudinary upload middleware
//   updateJobSeekerProfile
// );
router.put('/updateprofile', upload,isAuthenticated,  updateJobSeekerProfile);

router.post('/applyJob/:jobId',isAuthenticated,upload,applyJob)

export default router;
