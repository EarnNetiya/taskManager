const express = require('express');
const { adminOnly, protect } = require('../middleware/authMiddleware');
const { getUsers, getUsersByid, deleteUser } = require('../controllers/userController');

const router = express.Router();

// User Management Routes
router.get('/', protect, adminOnly, getUsers);
router.get('/:id', protect, getUsersByid);


module.exports = router;
