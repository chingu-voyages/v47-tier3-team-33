import { Request, Response } from 'express';
import NotificationModel from '../models/Notification';

export const getAllNotification = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;
		console.log(userId);

		const notifications = await NotificationModel.find({ userId });
		res.status(200).json(notifications);
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const updateNotification = async (req: Request, res: Response) => {
	try {
		const notificationId = req.params.id;
		const { status } = req.body;

		const existingNotification = await NotificationModel.findById(
			notificationId
		);
		if (!existingNotification) {
			return res.status(404).json({ error: 'Notification not found' });
		}

		await NotificationModel.findByIdAndUpdate(notificationId, { status });

		res.status(200).json({ message: 'Notification updated successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const deleteNotification = async (req: Request, res: Response) => {
	try {
		const notificationId = req.params.id;

		const removedNotification = await NotificationModel.findByIdAndDelete(
			notificationId
		);

		if (!removedNotification) {
			return res.status(404).json({ error: 'Notification not found' });
		}

		res.status(200).json({ message: 'Notification removed successfully' });
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
