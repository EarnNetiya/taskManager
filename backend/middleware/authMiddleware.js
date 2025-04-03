const jwt = require('jsonwebtoken');
const User = require('../model/User');

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startWith('Bearer')) {
            token = token.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } else {
            res.status(401).json({ message: "Token failed", error: error.message });
        }
    } catch (error) {
        res.status(401).json({ message: "Token failed", error: error.message });
    }
};

// Middleware to check if the user is an admin

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Access denied, Admins only." });
    }
};

module.exports = { protect, adminOnly };