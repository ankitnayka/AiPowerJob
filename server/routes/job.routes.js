import express from 'express';
import { createJob, getAllJobs } from '../controllers/jobController.js';
import isAuthenticated from '../middleware/isAuthenticated.js'
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

// Route for creating a job
router.post('/create',isAuthenticated ,roleMiddleware(['employer']),createJob);

// Route for getting all jobs
router.get('/', getAllJobs);

export default router;
