import { Router } from 'express';
import * as userController from './controllers/userController';

const router = Router();

// User Routes
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
// More for later...

export default router;