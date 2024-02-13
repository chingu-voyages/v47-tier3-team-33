import { Request, Response } from 'express';
import ConversationModel from '../models/Conversation';
import UserModel from '../models/User';
import MessageModel from '../models/Message';
import { io } from '../server';
import NotificationModel, { NotificationType } from '../models/Notification';

export const createConversation = async (req: Request, res: Response) => {
	try {
		const { userId, eventOrganizerId } = req.body;

		if (!userId || !eventOrganizerId) {
			return res.status(400).json({ error: 'Invalid request body' });
		}

		const existingConversation = await ConversationModel.findOne({
			participants: { $all: [userId, eventOrganizerId] },
		});

		if (existingConversation) {
			return res.status(200).json({ conversationId: existingConversation._id });
		}

		const newConversation = await ConversationModel.create({
			participants: [userId, eventOrganizerId],
		});

		return res.status(201).json({ conversationId: newConversation._id });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const sendMessage = async (req: Request, res: Response) => {
	try {
		const { conversationId, sender, text } = req.body;

		const [existingSender, existingConversation] = await Promise.all([
			UserModel.findById(sender),
			ConversationModel.findById(conversationId),
		]);

		if (!existingSender || !existingConversation) {
			return res
				.status(400)
				.json({ error: 'Invalid sender or conversation ID' });
		}

		const newMessage = await MessageModel.create({
			conversation: conversationId,
			sender,
			text,
		});

		existingConversation.messages.push(newMessage._id);
		await existingConversation.save();

		io.to(conversationId).emit('message', newMessage);

		const notificationData = await NotificationModel.create({
			userId: existingSender,
			message: text,
			type: NotificationType.NEW_INBOX_MESSAGE,
		});

		await notificationData.save();
		io.emit('getNotification', notificationData);

		return res.status(201).json(newMessage);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const getMessagesInConversation = async (
	req: Request,
	res: Response
) => {
	try {
		const conversationId = req.params.id;

		const existingConversation = await ConversationModel.findById(
			conversationId
		).populate('messages');

		if (!existingConversation) {
			return res
				.status(404)
				.json({ error: 'Conversation not found with the provided ID' });
		}

		const messages = existingConversation.messages;
		return res.status(200).json(messages);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const getAllConversationForUser = async (
	req: Request,
	res: Response
) => {
	try {
		const userId = req.params.id;

		const conversations = await ConversationModel.find({
			participants: userId,
		});

		return res.status(200).json(conversations);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};
