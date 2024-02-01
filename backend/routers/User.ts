import express from 'express';
import {
	createUser,
	getUserById,
	loginUser,
} from '../controllers/userController';

const router = express.Router();

// User Routes
router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);
// More for later...

export default router;
