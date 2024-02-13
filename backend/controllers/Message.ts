import { Request, Response } from 'express';
import MessageModel from '../models/Message';
import NotificationModel, { NotificationType } from '../models/Notification';

export const getUserMessages = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;
		const messages = await MessageModel.find({ reciever: userId }).populate(
			'sender',
			'username'
		);
		res.status(200).json({ messages });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const sendMessage = async (req: Request, res: Response) => {
	try {
		const { sender, reciever, message } = req.body;

		const newMessage = await MessageModel.create({ reciever, sender, message });

		await NotificationModel.create({
			userId: reciever,
			message: 'You have a new message',
			type: NotificationType.NEW_INBOX_MESSAGE,
			createdAt: new Date(),
		});

		res.status(201).json({ message: newMessage });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const markMessageAsRead = async (req: Request, res: Response) => {
	try {
		const messageId = req.params.messageId;
		const updatedMessage = await MessageModel.findByIdAndUpdate(
			messageId,
			{ isRead: true },
			{ new: true }
		);
		res.status(200).json({ message: updatedMessage });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
