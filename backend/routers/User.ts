import express from 'express';
import {
	createUser,
	loginUser,
  logoutUser,
  getUser,
	getUserById,
} from '../controllers/User';

const router = express.Router();

// User Routes
router.post('/', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/', getUser);
router.get('/:id', getUserById);

export default router;
