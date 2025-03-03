const jwt = require('jsonwebtoken');

const authMiddleware = async (req,res,next)=>{
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token found' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
        req.user = decoded; 
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Session expired. Please log in again.' });
        }
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

module.exports = authMiddleware;