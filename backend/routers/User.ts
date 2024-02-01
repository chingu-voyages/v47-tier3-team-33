import express from 'express';
import { createUser, getUserById } from '../controllers/userController';

const router = express.Router();

// User Routes
router.post('/', createUser);
router.get('/:id', getUserById);
// More for later...

export default router;
