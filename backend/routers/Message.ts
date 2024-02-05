import express from 'express';
import {
	getUserMessages,
	sendMessage,
	markMessageAsRead,
} from '../controllers/Message';
import verifyToken from '../middleware/auth';

const router = express.Router();

const app = express();

// Apply middleware to the routes that require authentication
app.use(verifyToken);

// Get all messages for a user
router.get('/:id', getUserMessages);

// Send a new message
router.post('/', sendMessage);

// Mark a message as read
router.put('/:messageId/mark-as-read', markMessageAsRead);

export default router;
