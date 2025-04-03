const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
}
// Register a new user
// POST /api/auth/register
const registerUser = async (req, res) => {
    try {} catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Login a user
// POST /api/auth/login
const loginUser = async (req, res) => {
    try {} catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get user profile
// GET /api/auth/profile
const getUserProfile = async (req, res) => {
    try {} catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Update user profile
// PUT /api/auth/profile
const updateUserProfile = async (req, res) => {
    try {} catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };