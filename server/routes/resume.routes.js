import express from "express";
import multer from "multer";
import { uploadResume } from "../controllers/resumeControll.js";

const router = express.Router();

// Multer instance for handling file uploads
const upload = multer();

// Resume upload route
router.post("/upload", upload.single("resume"), uploadResume);

export default router;
