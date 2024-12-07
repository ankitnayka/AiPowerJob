import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

// // Routes
import jobSeekerRoutes from "./routes/jobSeeker.route.js";

dotenv.config();
const app = express();
app.use(cookieParser());

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api/v1/jobseeker", jobSeekerRoutes);
// app.use("/api/v1/jobs", jobRoutes);
// app.use('/api/v1/resume',resumeRoutes)
// app.use("/api/applications", applicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
