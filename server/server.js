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
const allowedOrigins = ['http://localhost:5173']; // Add your frontend's URL
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api/v1/jobseeker", jobSeekerRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
