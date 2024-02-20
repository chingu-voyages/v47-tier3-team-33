'use strict';
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.io =
	exports.emitNotification =
	exports.getPendingNotifications =
	exports.userSocketMap =
	exports.upload =
		void 0;
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const db_1 = __importDefault(require('./config/db'));
const dotenv_1 = __importDefault(require('dotenv'));
const Category_1 = __importDefault(require('./routers/Category'));
const Events_1 = __importDefault(require('./routers/Events'));
const User_1 = __importDefault(require('./routers/User'));
const Notification_1 = __importDefault(require('./routers/Notification'));
const Conversations_1 = __importDefault(require('./routers/Conversations'));
const http_1 = __importDefault(require('http'));
const User_2 = __importDefault(require('./models/User'));
const Notification_2 = __importDefault(require('./models/Notification'));
const mongoose_1 = __importDefault(require('mongoose'));
const multer_1 = __importDefault(require('multer'));
const fs_1 = __importDefault(require('fs'));
const User_3 = require('./controllers/User');
// Multer configuration
const storage = multer_1.default.diskStorage({
	destination: (req, file, cb) => {
		const uploadDirectory = 'uploads';
		if (!fs_1.default.existsSync(uploadDirectory)) {
			fs_1.default.mkdirSync(uploadDirectory);
			console.log(`Directory ${uploadDirectory} created.`);
		}
		cb(null, uploadDirectory);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
exports.upload = (0, multer_1.default)({ storage: storage });
const socketio = require('socket.io');
const app = (0, express_1.default)();
dotenv_1.default.config();
const server = http_1.default.createServer(app);
const path_1 = __importDefault(require('path'));
const io = socketio(server, {
	cors: {
		origin: 'https://omnievents.vercel.app',
	},
});
exports.io = io;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(
	'/uploads',
	express_1.default.static(path_1.default.join(__dirname, 'uploads'))
);
app.use(
	'/event_images',
	express_1.default.static(path_1.default.join(__dirname, 'event_images'))
);
// Mongo URL and Connection
(0, db_1.default)();
// Routes
app.use('/categories', Category_1.default);
app.use('/events', Events_1.default);
app.use('/users', User_1.default);
app.put(
	'/users/:userId/profileImg',
	exports.upload.single('profile_img'),
	User_3.updateUserWithFile
);
app.use('/notifications', Notification_1.default);
app.use('/conversations', Conversations_1.default);
// Route handling the file upload and user update
exports.userSocketMap = {};
const getPendingNotifications = (userId) =>
	__awaiter(void 0, void 0, void 0, function* () {
		try {
			if (!userId || !mongoose_1.default.isValidObjectId(userId)) {
				console.error('Invalid userId:', userId);
				return [];
			}
			const pendingNotifications = yield Notification_2.default.find({
				userId,
				status: 'pending',
			});
			return pendingNotifications;
		} catch (error) {
			console.error('Error getting pending notifications:', error);
			return [];
		}
	});
exports.getPendingNotifications = getPendingNotifications;
const clearPendingNotifications = (userId) =>
	__awaiter(void 0, void 0, void 0, function* () {
		try {
			yield Notification_2.default.deleteMany({ userId, status: 'pending' });
			console.log('Pending notifications cleared successfully');
		} catch (error) {
			console.error('Error clearing pending notifications:', error);
		}
	});
const handleUserConnected = (socket, userId) =>
	__awaiter(void 0, void 0, void 0, function* () {
		var _a, _b, _c;
		exports.userSocketMap[userId] = { socket, notifications: [] };
		socket.on('disconnect', () =>
			__awaiter(void 0, void 0, void 0, function* () {
				exports.userSocketMap[userId].socket = null;
				console.log(`User ${userId} disconnected`);
				yield clearPendingNotifications(userId);
			})
		);
		const pendingNotifications = yield (0, exports.getPendingNotifications)(
			userId
		);
		if (
			pendingNotifications.length > 0 &&
			((_a = exports.userSocketMap[userId]) === null || _a === void 0
				? void 0
				: _a.socket)
		) {
			(_c =
				(_b = exports.userSocketMap[userId]) === null || _b === void 0
					? void 0
					: _b.socket) === null || _c === void 0
				? void 0
				: _c.emit('getNotifications', pendingNotifications);
			yield clearPendingNotifications(userId);
		}
		console.log(`User ${userId} connected with socket ID ${socket.id}`);
	});
const emitNotification = (recipientUserId, senderUser, eventId, type) =>
	__awaiter(void 0, void 0, void 0, function* () {
		var _d, _e;
		const socket =
			(_d = exports.userSocketMap[recipientUserId]) === null || _d === void 0
				? void 0
				: _d.socket;
		if (socket && recipientUserId in exports.userSocketMap) {
			const notificationData = {
				sender:
					senderUser === null || senderUser === void 0
						? void 0
						: senderUser._id.toString(),
				eventId,
				type,
			};
			socket.emit('getNotification', notificationData);
			console.log('Notification sent successfully');
			try {
				yield User_2.default.findByIdAndUpdate(
					recipientUserId,
					{
						$push: { notifications: notificationData },
					},
					{ new: true }
				);
				console.log('User document updated with new notification');
			} catch (error) {
				console.error(
					'Error updating user document with new notification:',
					error
				);
			}
		} else {
			(_e = exports.userSocketMap[recipientUserId]) === null || _e === void 0
				? void 0
				: _e.notifications.push({
						sender:
							senderUser === null || senderUser === void 0
								? void 0
								: senderUser._id.toString(),
						eventId,
						type,
				  });
			console.log(
				'Recipient not found in userSocketMap, storing notification as pending'
			);
		}
	});
exports.emitNotification = emitNotification;
// Connection event
io.on('connection', (socket) => {
	console.log(`Socket ${socket.id} connected`);
	socket.on('userConnected', ({ userId }) => {
		if (userId) {
			handleUserConnected(socket, userId);
		}
	});
	socket.on('rsvp', ({ sender, recipient, eventId }) =>
		__awaiter(void 0, void 0, void 0, function* () {
			try {
				if (
					!mongoose_1.default.isValidObjectId(sender) ||
					!mongoose_1.default.isValidObjectId(recipient)
				) {
					console.log('Invalid sender or recipient ID');
					return;
				}
				const recipientUser = yield User_2.default.findById(recipient);
				if (!recipientUser) {
					console.log('Recipient not found');
				}
				const recipientUserId =
					recipientUser === null || recipientUser === void 0
						? void 0
						: recipientUser._id.toString();
				console.log('recId', recipientUserId);
				const senderUser = yield User_2.default.findById(sender);
				if (!senderUser) {
					console.log('Sender not found');
					return;
				}
				(0, exports.emitNotification)(recipientUserId, senderUser, eventId);
				console.log('RSVP Notification sent successfully');
			} catch (error) {
				console.error('Error handling rsvp event:', error);
			}
		})
	);
	socket.on('sendNotification', ({ sender, recipient }) =>
		__awaiter(void 0, void 0, void 0, function* () {
			if (
				!mongoose_1.default.isValidObjectId(sender) ||
				!mongoose_1.default.isValidObjectId(recipient) ||
				!mongoose_1.default.isValidObjectId(recipient[0])
			) {
				console.log('Invalid sender or recipient ID');
				return;
			}
			const recipientUser = yield User_2.default.findById(
				recipient[0] || recipient
			);
			const recipientUserId =
				recipientUser === null || recipientUser === void 0
					? void 0
					: recipientUser._id.toString();
			const senderUser = yield User_2.default.findById(sender);
			(0, exports.emitNotification)(recipientUserId, senderUser);
		})
	);
	// Disconnect event
	socket.on('disconnect', () => {
		console.log(`Socket ${socket.id} disconnected`);
	});
});

const PORT = process.env.PORT || 8000;
server.listen(PORT || 8000, () => {
	console.log(`App listening on port ${PORT}`);
});
