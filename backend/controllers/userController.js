const Task = require("../model/Task");
const User = require("../model/User");
const bcrypt = require("bcryptjs");


// Get all users
// GET /api/users
const getUsers = async (req, res) => {
   try {
      
   } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
   }
};
// Get user by ID
// GET /api/users/:id
const getUsersByid = async (req, res) => {
    try {
    } catch (error) {
       res.status(500).json({ message: "Server error", error: error.message });
    }
};
// Delete user
// DELETE /api/users/:id
const deleteUser = async (req,res) => {
    try {
    } catch (error) {
       res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getUsers, getUsersByid, deleteUser };