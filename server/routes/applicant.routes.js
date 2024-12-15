import express, { Router } from 'express'
import {upload} from '../middleware/multer'
import isAuthenticated from '../middleware/isAuthenticated';
import Application from '../models/Application';
import { applyJob } from '../controllers/applyJob';

const router=express>Router();

router.post('/applyJob/:jobId',isAuthenticated,upload,applyJob)



export default router

// Employer to fetch user Details 

const applications = await Application.find({ jobId })
    .populate("userId", "name email profilePhoto") // Fetch user's profile fields
    .exec();

res.status(200).json({ applications });
