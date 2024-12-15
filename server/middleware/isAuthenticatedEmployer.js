import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config();

const isAuthenticateEmployer=async(req,res,next)=>{
    try {
        const token=req.cookies.employerToken
        if (!token) {
            return res.status(401).json({
                message: "User not authorized! Token missing.",
                success: false,
            });
        }
       

        const decoded= jwt.verify(token,process.env.SECRET_KEY)
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid or expired token!",
                success: false,
            });
        }

        req.employerId=decoded.employerId
        next()
    } catch (error) {
        console.log("error occur on internal serever",error)
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}

export default isAuthenticateEmployer