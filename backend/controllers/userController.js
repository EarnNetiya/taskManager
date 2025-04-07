const Task = require("../model/Task");
const User = require("../model/User");
const bcrypt = require("bcryptjs");


// Get all users
// GET /api/users
const getUsers = async (req, res) => {
   try {
      const users = await User.find({ role:'member'}).select("-password");

      // Add task count to each user
      const usersWithTaskCounts = await Promise.all(users.map(async (user) => {
         const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: "pending" });
         const inProgressTasks = await Task.countDocuments({ assignedTo: user._id, status: "in-progress" });
         const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: "completed" });

         return {
            ...user.toObject(),
            pending: pendingTasks,
            inProgress: inProgressTasks,
            completed: completedTasks,
         };
      }));

      res.json(usersWithTaskCounts);
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