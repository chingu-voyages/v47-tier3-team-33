import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import dotenv from 'dotenv';
import categoryRouter from './routers/Category';
import EventRouter from './routers/Events';
import userRouter from './routers/User';
import notificationRouter from './routers/Notification';
import messageRouter from './routers/Message';
import conversationRouter from './routers/Conversations';
import http from 'http';
import { Socket } from 'socket.io';
import UserModel from './models/User';
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
app.use('/messages', messageRouter);
app.use('/conversations', conversationRouter);

const userSocketMap: {
	[userId: string]: { socket: Socket | null; notifications: any[] };
} = {};

console.log('userSocketMap: ', userSocketMap);

const handleUserConnected = async (socket: Socket, userId: string) => {
	// Store user information
	userSocketMap[userId] = { socket, notifications: [] };

	socket.on('disconnect', () => {
		// set user socket to null when logged out
		userSocketMap[userId]!.socket = null;
		console.log(`User ${userId} disconnected`);
	});

	// Emit pending notifications
	const pendingNotifications = userSocketMap[userId]?.notifications;
	if (pendingNotifications?.length > 0 && userSocketMap[userId]?.socket) {
		userSocketMap[userId]!.socket?.emit(
			'getNotifications',
			pendingNotifications
		);
		userSocketMap[userId]!.notifications = []; /
	}

	console.log(`User ${userId} connected with socket ID ${socket.id}`);
};

const emitNotification = async (
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
	} else {
		// If user is not connected, store the notification as pending
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
			console.log('rsvp event received:', { sender, recipient, eventId });

			// Ensure sender and recipient are valid ObjectId strings
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
				return;
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
		console.log('messsage sender: ', sender, 'message recipient: ', recipient);

		// Ensure sender and recipient are valid ObjectId strings
		if (
			!mongoose.isValidObjectId(sender) ||
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
