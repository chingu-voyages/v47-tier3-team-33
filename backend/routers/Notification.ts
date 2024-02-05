import express from 'express';
import {
	getAllNotification,
	updateNotification,
	deleteNotification,
} from '../controllers/Notifications';

const router = express.Router();

router.get('/:id', getAllNotification);
router.put('/:id', updateNotification);
router.delete('/:id', deleteNotification);

export default router;
