'use strict';
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (
					!desc ||
					('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
				) {
					desc = {
						enumerable: true,
						get: function () {
							return m[k];
						},
					};
				}
				Object.defineProperty(o, k2, desc);
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
		  });
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, 'default', { enumerable: true, value: v });
		  }
		: function (o, v) {
				o['default'] = v;
		  });
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null)
			for (var k in mod)
				if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
					__createBinding(result, mod, k);
		__setModuleDefault(result, mod);
		return result;
	};
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
exports.deleteEventById =
	exports.updateEventById =
	exports.unBookEvent =
	exports.bookEvent =
	exports.createEvent =
	exports.uploadEventImage =
	exports.getEventById =
	exports.getEvents =
		void 0;
const Event_1 = require('../models/Event');
const Notification_1 = __importStar(require('../models/Notification'));
const User_1 = __importDefault(require('../models/User'));
const server_1 = require('../server');
const multer_1 = __importDefault(require('multer'));
const fs_1 = __importDefault(require('fs'));
const getEvents = (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		try {
			const events = yield Event_1.EventModel.find({});
			res.status(200).json({ events });
		} catch (error) {
			console.log(error.message);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
exports.getEvents = getEvents;
const getEventById = (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		try {
			const event = yield Event_1.EventModel.findById(req.params.id);
			if (!event) {
				return res.status(404).json({ error: 'Event not found' });
			}
			res.json(event);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: error.message || 'Internal Server Error' });
		}
	});
exports.getEventById = getEventById;
// Multer configuration for event image uploads
const eventImageStorage = multer_1.default.diskStorage({
	destination: (req, file, cb) => {
		const uploadDirectory = 'event_images';
		if (!fs_1.default.existsSync(uploadDirectory)) {
			fs_1.default.mkdirSync(uploadDirectory);
			console.log(`Directory ${uploadDirectory} created.`);
		}
		cb(null, uploadDirectory); // Destination directory for event images
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname); // Use the original filename for the uploaded image
	},
});
// Create a multer instance for handling event image uploads
exports.uploadEventImage = (0, multer_1.default)({
	storage: eventImageStorage,
});
const createEvent = (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		try {
			const eventData = req.body;
			console.log('eventData:', eventData);
			eventData.organizer = Array.isArray(eventData.organizer)
				? eventData.organizer[0]
				: eventData.organizer;
			// Check if an image file was uploaded
			if (!req.file) {
				return res.status(400).json({ error: 'Event image is required' });
			}
			// Add the image file path or filename to the eventData
			eventData.image =
				`https://omni-events-571e671c7a3f.herokuapp.com/${req.file.path}` ||
				`https://omni-events-571e671c7a3f.herokuapp.com/${req.file.filename}`;
			console.log('eventData:', eventData);
			// Create a new event with the provided data
			const newEvent = yield Event_1.EventModel.create(eventData);
			// Return the created event in the response
			res.status(201).json({ event: newEvent });
		} catch (error) {
			console.error(error.message);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
exports.createEvent = createEvent;
const findSocket = (userId) => {
	var _a;
	const userSocket =
		(_a = server_1.userSocketMap[userId]) === null || _a === void 0
			? void 0
			: _a.socket;
	return userSocket || null;
};
const bookEvent = (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		var _a, _b;
		try {
			const { userId, eventId } = req.body;
			const user = yield User_1.default.findById(userId);
			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}
			user.events.push(eventId);
			yield user.save();
			// Find the event by ID to get the organizer's user ID
			const event = yield Event_1.EventModel.findById(eventId);
			if (!event) {
				return res.status(404).json({ error: 'Event not found' });
			} else {
				event.attendees.push(userId);
				console.log('attendee added');
				server_1.io.emit(`eventUpdate:${eventId}`, {
					attendees: event.attendees,
				});
			}
			yield event.save();
			// Create a local map for sockets involved in this request
			const localSocketMap = {};
			const organizerUserId = event.organizer.toString();
			// Ensure that the organizer's socket is available in userSocketMap
			const organizerSocket = findSocket(organizerUserId);
			if (!organizerSocket) {
				// Organizer socket not found, store the notification as pending
				const pendingNotification = {
					userId: organizerUserId,
					message: eventId,
					type: Notification_1.NotificationType.EVENT_BOOKED,
				};
				// Save the pending notification to the organizer's notifications array
				(_a = server_1.userSocketMap[organizerUserId]) === null || _a === void 0
					? void 0
					: _a.notifications.push(pendingNotification);
				// Return success response as the RSVP is still successful
				return res.json({ message: 'RSVP successful' });
			}
			// Organizer's socket found, emit a notification
			const notificationData = yield Notification_1.default.create({
				userId: organizerUserId,
				message: eventId,
				type: Notification_1.NotificationType.EVENT_BOOKED,
			});
			yield notificationData.save();
			// Emit the notification to the organizer's socket
			organizerSocket.emit('getNotification', notificationData);
			// Store the socket in the local map
			localSocketMap[organizerUserId] = organizerSocket;
			// Deliver any pending notifications for the organizer if available
			const pendingNotifications =
				((_b = server_1.userSocketMap[organizerUserId]) === null ||
				_b === void 0
					? void 0
					: _b.notifications) || [];
			for (const pendingNotification of pendingNotifications) {
				organizerSocket.emit('getNotification', pendingNotification);
			}
			// Clear pending notifications after delivering
			server_1.userSocketMap[organizerUserId].notifications = [];
			res.json({ message: 'RSVP successful' });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
exports.bookEvent = bookEvent;
const unBookEvent = (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		var _c;
		try {
			const { userId, eventId } = req.body;
			const user = yield User_1.default.findById(userId);
			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}
			const event = yield Event_1.EventModel.findById(eventId);
			if (!event) {
				return res.status(404).json({ error: 'Event not found' });
			}
			// Remove the user's ID from the event's attendees list
			const index = event.attendees.indexOf(userId);
			if (index !== -1) {
				event.attendees.splice(index, 1);
			}
			yield event.save();
			// Remove the event's ID from the user's events list
			const eventIndex = user.events.indexOf(eventId);
			if (eventIndex !== -1) {
				user.events.splice(eventIndex, 1);
			}
			yield user.save();
			// Notify the organizer about the unbooking
			const organizerUserId = event.organizer.toString();
			const organizerSocket = findSocket(organizerUserId);
			if (organizerSocket) {
				const notificationData = yield Notification_1.default.create({
					userId: organizerUserId,
					message: eventId,
					type: Notification_1.NotificationType.EVENT_UNBOOKED,
				});
				yield notificationData.save();
				organizerSocket.emit('getNotification', notificationData);
			} else {
				const pendingNotification = {
					userId: organizerUserId,
					message: eventId,
					type: Notification_1.NotificationType.EVENT_UNBOOKED,
				};
				(_c = server_1.userSocketMap[organizerUserId]) === null || _c === void 0
					? void 0
					: _c.notifications.push(pendingNotification);
			}
			res.json({ message: 'Unbooking successful' });
		} catch (error) {
			console.error(error.message);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
exports.unBookEvent = unBookEvent;
const updateEventById = (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		var _d;
		try {
			const eventId = req.params.eventId;
			const updatedEventData = req.body;
			console.log(eventId);
			console.log('updatee:', updatedEventData);
			const userId = Array.isArray(req.body.userId)
				? req.body.userId[0]
				: req.body.userId;
			const event = yield Event_1.EventModel.findById(eventId);
			if (!event) {
				console.log('even:', event);
				return res.status(404).json({ error: 'Event not found' });
			}
			console.log('found1');
			// Check if the user making the request is the organizer
			if (event.organizer.toString() !== userId) {
				console.log('org:', event.organizer.toString());
				console.log('ouser', userId);
				return res.status(403).json({
					error: 'Unauthorized: Only the organizer can update this event',
				});
			}
			const updatedEvent = yield Event_1.EventModel.findByIdAndUpdate(
				eventId,
				updatedEventData,
				{ new: true }
			);
			if (!updatedEvent) {
				return res.status(404).json({ error: 'Event not found' });
			}
			// Notify all attendees about the event status
			const attendeeUserIds = updatedEvent.attendees.map((attendee) =>
				attendee.toString()
			);
			let notificationType;
			// Check the event status and set the appropriate notification type
			// if (updatedEvent.endDate && updatedEvent.endDate < new Date()) {
			// 	notificationType = NotificationType.EVENT_ENDED;
			// } else if (updatedEvent.startDate && updatedEvent.startDate > new Date()) {
			// 	notificationType = NotificationType.EVENT_STARTING_SOON;
			// } else {
			notificationType = Notification_1.NotificationType.EVENT_UPDATED;
			// }
			// Loop through each attendee user ID and create a notification for each
			for (const userId of attendeeUserIds) {
				const notificationData = yield Notification_1.default.create({
					userId,
					message: eventId,
					type: notificationType,
				});
				yield notificationData.save();
				// Emit the notification to the attendee's socket
				const attendeeSocket = findSocket(userId);
				if (attendeeSocket) {
					attendeeSocket.emit('getNotification', notificationData);
				} else {
					// If the socket is not available, store the notification as pending
					(_d = server_1.userSocketMap[userId]) === null || _d === void 0
						? void 0
						: _d.notifications.push(notificationData);
				}
			}
			res.json({ event: updatedEvent, message: 'Event updated successfully' });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
exports.updateEventById = updateEventById;
const deleteEventById = (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		try {
			const eventId = req.params.id;
			const userId = req.body.userId;
			console.log('userId: ', userId);
			const event = yield Event_1.EventModel.findById(eventId);
			if (!event) {
				return res.status(404).json({ error: 'Event not found' });
			}
			// Check if the user making the request is the organizer
			if (event.organizer.toString() !== userId) {
				return res.status(403).json({
					error: 'Unauthorized: Only the organizer can delete this event',
				});
			}
			const deletedEvent = yield Event_1.EventModel.findByIdAndDelete(eventId);
			if (!deletedEvent) {
				return res.status(404).json({ error: 'Event not found' });
			}
			// Notify all attendees about the event cancellation
			const attendeeUserIds = deletedEvent.attendees.map((attendee) =>
				attendee.toString()
			);
			const notificationData = yield Notification_1.default.create({
				userId: attendeeUserIds,
				message: eventId,
				type: Notification_1.NotificationType.EVENT_CANCELLED,
			});
			yield notificationData.save();
			// Emit the notification to all attendees' sockets
			attendeeUserIds.forEach((userId) => {
				var _a;
				const attendeeSocket = findSocket(userId);
				if (attendeeSocket) {
					attendeeSocket.emit('getNotification', notificationData);
				} else {
					// If the socket is not available, store the notification as pending
					(_a = server_1.userSocketMap[userId]) === null || _a === void 0
						? void 0
						: _a.notifications.push(notificationData);
				}
			});
			res.json({ message: 'Event deleted successfully' });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
exports.deleteEventById = deleteEventById;
