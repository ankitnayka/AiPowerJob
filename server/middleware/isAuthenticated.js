import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        // Retrieve token from cookies
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authorized! Token missing.",
                success: false,
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token!",
                success: false,
            });
        }

        // Attach user ID to request object
        req.id = decoded.id;
        next();
    } catch (error) {
        // Log error and send error response
        console.error("Error in isAuthenticated middleware:", error);
        res.status(500).json({
            message: "Server error during authentication",
            error: error.message,
            success: false,
        });
    }
};

export default isAuthenticated;
