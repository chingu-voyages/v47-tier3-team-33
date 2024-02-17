import express from 'express';
import {
	getAllNotification,
	getNotificationByUserId,
	updateNotification,
	deleteNotification,
	getUserPendingNotifications,
} from '../controllers/Notifications';

const router = express.Router();

router.get('/', getAllNotification);
router.get('/:userId', getNotificationByUserId);
router.get('/pending/:userId', getUserPendingNotifications);
router.put('/:id', updateNotification);
router.delete('/:id', deleteNotification);

export default router;
