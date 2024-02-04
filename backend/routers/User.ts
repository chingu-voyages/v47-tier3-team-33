import express from 'express';
import {
	createUser,
	loginUser,
  getUser,
	getUserById,
} from '../controllers/User';

const router = express.Router();

// User Routes
router.post('/', createUser);
router.post('/login', loginUser);
router.get('/', getUser);
router.get('/:id', getUserById);
// More for later...

export default router;
