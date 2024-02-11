import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import dotenv from 'dotenv';
import categoryRouter from './routers/Category';
import EventRouter from './routers/Events';
import userRouter from './routers/User';
import notificationRouter from './routers/Notification';
import conversationRouter from './routers/Conversations';
import http from 'http';
import { Socket } from 'socket.io';
import UserModel from './models/User';
import NotificationModel from './models/Notification';
import mongoose from 'mongoose';

const socketio = require('socket.io');

const app = express();
dotenv.config();
const server = http.createServer(app);

const PORT = 8000 || process.env.PORT;

const io = socketio(server, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Mongo URL and Connection
connectDB();

// Routes
app.use('/categories', categoryRouter);
app.use('/events', EventRouter);
app.use('/users', userRouter);
app.use('/notifications', notificationRouter);
app.use('/conversations', conversationRouter);

export const userSocketMap: {
	[userId: string]: {
		[x: string]: any;
		socket: Socket | null;
		notifications: any[];
	};
} = {};

const getPendingNotifications = async (userId: string) => {
	try {
		const pendingNotifications = await NotificationModel.find({
			userId,
			status: 'pending',
		});
		return pendingNotifications;
	} catch (error) {
		console.error('Error getting pending notifications:', error);
		return [];
	}
};

const clearPendingNotifications = async (userId: string) => {
	try {
		await NotificationModel.deleteMany({ userId, status: 'pending' });
		console.log('Pending notifications cleared successfully');
	} catch (error) {
		console.error('Error clearing pending notifications:', error);
	}
};

const handleUserConnected = async (socket: Socket, userId: string) => {
	userSocketMap[userId] = { socket, notifications: [] };

	socket.on('disconnect', async () => {
		userSocketMap[userId]!.socket = null;
		console.log(`User ${userId} disconnected`);

		await clearPendingNotifications(userId);
	});

	const pendingNotifications = await getPendingNotifications(userId);
	if (pendingNotifications.length > 0 && userSocketMap[userId]?.socket) {
		userSocketMap[userId]?.socket?.emit(
			'getNotifications',
			pendingNotifications
		);

		await clearPendingNotifications(userId);
	}

	console.log(`User ${userId} connected with socket ID ${socket.id}`);
};

export const emitNotification = async (
	recipientUserId: string,
	senderUser: any,
	eventId?: string,
	type?: string
) => {
	const socket = userSocketMap[recipientUserId]?.socket;
	if (socket && recipientUserId in userSocketMap) {
		const notificationData = {
			sender: senderUser?._id.toString(),
			eventId,
			type,
		};

		socket.emit('getNotification', notificationData);
		console.log('Notification sent successfully');

		try {
			await UserModel.findByIdAndUpdate(
				recipientUserId,
				{
					$push: { notifications: notificationData },
				},
				{ new: true }
			);

			console.log('User document updated with new notification');
		} catch (error: any) {
			console.error(
				'Error updating user document with new notification:',
				error
			);
		}
	} else {
		userSocketMap[recipientUserId]?.notifications.push({
			sender: senderUser?._id.toString(),
			eventId,
			type,
		});

		console.log(
			'Recipient not found in userSocketMap, storing notification as pending'
		);
	}
};

// Connection event
io.on('connection', (socket: Socket) => {
	console.log(`Socket ${socket.id} connected`);

	socket.on('userConnected', ({ userId }: any) => {
		if (userId) {
			handleUserConnected(socket, userId);
		}
	});

	socket.on('rsvp', async ({ sender, recipient, eventId }: any) => {
		try {
			if (
				!mongoose.isValidObjectId(sender) ||
				!mongoose.isValidObjectId(recipient)
			) {
				console.log('Invalid sender or recipient ID');
				return;
			}

			const recipientUser = await UserModel.findById(recipient);

			if (!recipientUser) {
				console.log('Recipient not found');
			}

			const recipientUserId = recipientUser?._id.toString();
			console.log('recId', recipientUserId);

			const senderUser = await UserModel.findById(sender);

			if (!senderUser) {
				console.log('Sender not found');
				return;
			}

			emitNotification(recipientUserId, senderUser, eventId);

			console.log('RSVP Notification sent successfully');
		} catch (error) {
			console.error('Error handling rsvp event:', error);
		}
	});

	socket.on('sendNotification', async ({ sender, recipient }: any) => {
		if (
			!mongoose.isValidObjectId(sender) ||
			!mongoose.isValidObjectId(recipient) ||
			!mongoose.isValidObjectId(recipient[0])
		) {
			console.log('Invalid sender or recipient ID');
			return;
		}

		const recipientUser = await UserModel.findById(recipient[0] || recipient);
		const recipientUserId = recipientUser?._id.toString();
		const senderUser = await UserModel.findById(sender);

		emitNotification(recipientUserId, senderUser);
	});

	// Disconnect event
	socket.on('disconnect', () => {
		console.log(`Socket ${socket.id} disconnected`);
	});
});

server.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});

export { io };
