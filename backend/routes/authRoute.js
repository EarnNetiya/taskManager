const express = require("express");
const { registerUser, loginUser, registerUser, getUserProfile, updateUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// auth routes
router.post("/register", registerUser);  // Register a new user
router.post("/login", loginUser); // Login a user
router.post("profile", protect, getUserProfile); // Get user profile
router.put("/profile", protect, updateUserProfile); // Update user profile

module.exports = router;