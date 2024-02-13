import express from 'express';
import {
  createUser,
  loginUser,
  logoutUser,
  getUser,
  getUserById,
  deleteUser,
  updateUser,
} from '../controllers/User';

const router = express.Router();

// User Routes
router.post('/', createUser);         // Create User
router.post('/login', loginUser);     // Login
router.post('/logout', logoutUser);   // Logout
router.get('/:id', getUserById);      // Get User by ID
router.put('/:id', updateUser);       // Update User
router.delete('/:id', deleteUser);    // Delete User
router.get('/', getUser);             // Get All Users (optional)

export default router;
