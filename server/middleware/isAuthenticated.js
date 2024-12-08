import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const isAuthenticated = async (req, res, next) => {
    try {
        // Ensure SECRET_KEY is defined
        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in environment variables.");
        }
        console.log(process.env.SECRET_KEY);
        
        // Retrieve token from cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authorized! Token missing.",
                success: false,
            });
        }
     
        
        // Verify token
        const decoded =await jwt.verify(token, process.env.SECRET_KEY);
        console.log("Token  ID:", decoded);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid or expired token!",
                success: false,
            });
        }

        // Attach user ID to request object
        req.id = decoded.jobSeekerId;

        next();
    } catch (error) {
        console.error("Error in isAuthenticated middleware:", error.message);
        res.status(500).json({
            message: "Authentication failed. Please try again later.",
            success: false,
        });
    }
};

export default isAuthenticated;
