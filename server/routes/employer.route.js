import express from 'express'
import { employerDetails, employerLogin, employerLogout, employerSignup, employerUpdate } from '../controllers/employerController.js'
import isAuthenticateEmployer from '../middleware/isAuthenticatedEmployer.js'
import { upload } from '../middleware/multer.js'

const router=express.Router()


router.post('/employerSignup',employerSignup)
router.post('/employerLogin',employerLogin)
router.get('/employer',isAuthenticateEmployer,employerDetails)
router.put('/employerUpdate',upload,isAuthenticateEmployer,employerUpdate)
router.get('/employerLogout',employerLogout)


export default router