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

const userSocketMap: { [userId: string]: Socket } = {};

console.log('userSocketMap: ', userSocketMap);
io.on('connection', (socket: Socket) => {
	console.log(`Socket ${socket.id} connected`);

	socket.on('userConnected', ({ userId }: any) => {
		if (userId) {
			userSocketMap[userId] = socket;

			socket.on('disconnect', () => {
				delete userSocketMap[userId];
				console.log(`User ${userId} disconnected`);
			});

			console.log(`User ${userId} connected with socket ID ${socket.id}`);
		}
	});

	socket.on('message', async (message: any) => {
		io.emit('message', message);
	});

	socket.on('rsvp', () => {});

	socket.on('sendNotification', async ({ sender, recipient, type }: any) => {
		const recipientUser = await UserModel.findById(recipient[0]);
		const recipientUserId = recipientUser?._id.toString();
		const senderUser = await UserModel.findById(sender);

		if (recipientUserId && userSocketMap[recipientUserId]) {
			userSocketMap[recipientUserId].emit('getNotification', {
				sender: senderUser,
				type,
			});
			console.log('Notification sent successfully');
		} else {
			console.log('Recipient not found in userSocketMap');
		}
		console.log('userSocketMap: ', userSocketMap);
	});

	socket.on('disconnect', () => {
		// Remove user from the map on disconnect
		const userId = Object.keys(userSocketMap).find(
			(key) => userSocketMap[key] === socket
		);
		if (userId) {
			delete userSocketMap[userId];
			console.log(`User ${userId} disconnected`);
		}
	});
});

// Start server
server.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});

export { io };
