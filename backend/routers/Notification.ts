import express from 'express';
import {
	getAllNotification,
	getNotificationByUserId,
	updateNotification,
	deleteNotification,
	getPendingNotifications,
} from '../controllers/Notifications';

const router = express.Router();

router.get('/', getAllNotification);
router.get('/:userId', getNotificationByUserId);
router.get('/pending/:userId', getPendingNotifications);
router.put('/:id', updateNotification);
router.delete('/:id', deleteNotification);

export default router;
