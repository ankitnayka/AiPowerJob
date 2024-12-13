import express from 'express'
import { employerDetails, employerLogin, employerLogout, employerSignup, employerUpdate } from '../controllers/employerController.js'
import isAuthenticateEmployer from '../middleware/isAuthenticatedEmployer.js'
import { upload } from '../middleware/multer.js'
import { createJob, deleteJob, getAllJobs, updateJobDetails } from '../controllers/jobController.js'

const router=express.Router()


router.post('/employerSignup',employerSignup)
router.post('/employerLogin',employerLogin)
router.get('/employer',isAuthenticateEmployer,employerDetails)
router.put('/employerUpdate',upload,isAuthenticateEmployer,employerUpdate)
router.get('/employerLogout',employerLogout)

//job Manage on Employer DashBoard

router.post('/jobPost',isAuthenticateEmployer,createJob)
router.get('/getAllJobs',isAuthenticateEmployer,getAllJobs)
router.put('/jobs/:id',isAuthenticateEmployer,updateJobDetails)
router.delete('/jobs/:id',isAuthenticateEmployer,deleteJob)


export default router