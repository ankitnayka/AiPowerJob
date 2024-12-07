import express from 'express'
import { loginJobSeeker,logoutJobSeeker,signupJobSeeker,getJobSeekerProfile,updateJobSeekerProfile } from '../controllers/jobSeekerController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router=express.Router()

router.post('/signup', signupJobSeeker);


router.post('/login', loginJobSeeker);

router.get('/logout', logoutJobSeeker);

router.get('/profile',isAuthenticated, getJobSeekerProfile);

router.put('/updateprofile',isAuthenticated, updateJobSeekerProfile);

export default router