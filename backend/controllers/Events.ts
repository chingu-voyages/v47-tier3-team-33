import { Request, Response } from 'express';
import { EventModel, IEvent } from '../models/Event';
import NotificationModel, { NotificationType } from '../models/Notification';
import UserModel from '../models/User';
import { io, userSocketMap } from '../server';
import { Socket } from 'socket.io';
import multer from 'multer';
import fs from 'fs';

export const getEvents = async (req: Request, res: Response) => {
	try {
		const events = await EventModel.find({});
		res.status(200).json({ events });
	} catch (error: any) {
		console.log(error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const getEventById = async (req: Request, res: Response) => {
	try {
		const event = await EventModel.findById(req.params.id);
		if (!event) {
			return res.status(404).json({ error: 'Event not found' });
		}
		res.json(event);
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ error: error.message || 'Internal Server Error' });
	}
};

// Multer configuration for event image uploads
const eventImageStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadDirectory = 'event_images';
		if (!fs.existsSync(uploadDirectory)) {
			fs.mkdirSync(uploadDirectory);
			console.log(`Directory ${uploadDirectory} created.`);
		}
		cb(null, uploadDirectory); // Destination directory for event images
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname); // Use the original filename for the uploaded image
	},
});

// Create a multer instance for handling event image uploads
export const uploadEventImage = multer({ storage: eventImageStorage });

export const createEvent = async (req: Request, res: Response) => {
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
		const newEvent = await EventModel.create(eventData);

		// Return the created event in the response
		res.status(201).json({ event: newEvent });
	} catch (error: any) {
		console.error(error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const findSocket = (userId: string): Socket | null => {
	const userSocket = userSocketMap[userId]?.socket;
	return userSocket || null;
};
export const bookEvent = async (req: Request, res: Response) => {
	try {
		const { userId, eventId } = req.body;

		const user = await UserModel.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		user.events.push(eventId);

		await user.save();

		// Find the event by ID to get the organizer's user ID
		const event = await EventModel.findById(eventId);

		if (!event) {
			return res.status(404).json({ error: 'Event not found' });
		} else {
			event.attendees.push(userId);
			console.log('attendee added');

			io.emit(`eventUpdate:${eventId}`, { attendees: event.attendees });
		}

		await event.save();

		// Create a local map for sockets involved in this request
		const localSocketMap: { [userId: string]: Socket | null } = {};

		const organizerUserId = event.organizer.toString();

		// Ensure that the organizer's socket is available in userSocketMap
		const organizerSocket = findSocket(organizerUserId);

		if (!organizerSocket) {
			// Organizer socket not found, store the notification as pending
			const pendingNotification = {
				userId: organizerUserId,
				message: eventId,
				type: NotificationType.EVENT_BOOKED,
			};

			// Save the pending notification to the organizer's notifications array
			userSocketMap[organizerUserId]?.notifications.push(pendingNotification);

			// Return success response as the RSVP is still successful
			return res.json({ message: 'RSVP successful' });
		}

		// Organizer's socket found, emit a notification
		const notificationData = await NotificationModel.create({
			userId: organizerUserId,
			message: eventId,
			type: NotificationType.EVENT_BOOKED,
		});

		await notificationData.save();

		// Emit the notification to the organizer's socket
		organizerSocket.emit('getNotification', notificationData);

		// Store the socket in the local map
		localSocketMap[organizerUserId] = organizerSocket;

		// Deliver any pending notifications for the organizer if available
		const pendingNotifications =
			userSocketMap[organizerUserId]?.notifications || [];

		for (const pendingNotification of pendingNotifications) {
			organizerSocket.emit('getNotification', pendingNotification);
		}

		// Clear pending notifications after delivering
		userSocketMap[organizerUserId]!.notifications = [];

		res.json({ message: 'RSVP successful' });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const unBookEvent = async (req: Request, res: Response) => {
	try {
		const { userId, eventId } = req.body;

		const user = await UserModel.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const event = await EventModel.findById(eventId);

		if (!event) {
			return res.status(404).json({ error: 'Event not found' });
		}

		// Remove the user's ID from the event's attendees list
		const index = event.attendees.indexOf(userId);
		if (index !== -1) {
			event.attendees.splice(index, 1);
		}

		await event.save();

		// Remove the event's ID from the user's events list
		const eventIndex = user.events.indexOf(eventId);
		if (eventIndex !== -1) {
			user.events.splice(eventIndex, 1);
		}

		await user.save();

		// Notify the organizer about the unbooking
		const organizerUserId = event.organizer.toString();
		const organizerSocket = findSocket(organizerUserId);

		if (organizerSocket) {
			const notificationData = await NotificationModel.create({
				userId: organizerUserId,
				message: eventId,
				type: NotificationType.EVENT_UNBOOKED,
			});

			await notificationData.save();

			organizerSocket.emit('getNotification', notificationData);
		} else {
			const pendingNotification = {
				userId: organizerUserId,
				message: eventId,
				type: NotificationType.EVENT_UNBOOKED,
			};

			userSocketMap[organizerUserId]?.notifications.push(pendingNotification);
		}

		res.json({ message: 'Unbooking successful' });
	} catch (error: any) {
		console.error(error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const updateEventById = async (req: Request, res: Response) => {
	try {
		const eventId = req.params.eventId;
		const updatedEventData: Partial<IEvent> = req.body;
		console.log(eventId);
		console.log('updatee:', updatedEventData);

		const userId = Array.isArray(req.body.userId)
			? req.body.userId[0]
			: req.body.userId;

		const event = await EventModel.findById(eventId);

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

		const updatedEvent = await EventModel.findByIdAndUpdate(
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

		let notificationType: NotificationType;

		// Check the event status and set the appropriate notification type
		// if (updatedEvent.endDate && updatedEvent.endDate < new Date()) {
		// 	notificationType = NotificationType.EVENT_ENDED;
		// } else if (updatedEvent.startDate && updatedEvent.startDate > new Date()) {
		// 	notificationType = NotificationType.EVENT_STARTING_SOON;
		// } else {
		notificationType = NotificationType.EVENT_UPDATED;
		// }

		// Loop through each attendee user ID and create a notification for each
		for (const userId of attendeeUserIds) {
			const notificationData = await NotificationModel.create({
				userId,
				message: eventId,
				type: notificationType,
			});

			await notificationData.save();

			// Emit the notification to the attendee's socket
			const attendeeSocket = findSocket(userId);

			if (attendeeSocket) {
				attendeeSocket.emit('getNotification', notificationData);
			} else {
				// If the socket is not available, store the notification as pending
				userSocketMap[userId]?.notifications.push(notificationData);
			}
		}

		res.json({ event: updatedEvent, message: 'Event updated successfully' });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const deleteEventById = async (req: Request, res: Response) => {
	try {
		const eventId = req.params.id;
		const userId = req.body.userId;
		console.log('userId: ', userId);

		const event = await EventModel.findById(eventId);

		if (!event) {
			return res.status(404).json({ error: 'Event not found' });
		}

		// Check if the user making the request is the organizer
		if (event.organizer.toString() !== userId) {
			return res.status(403).json({
				error: 'Unauthorized: Only the organizer can delete this event',
			});
		}

		const deletedEvent = await EventModel.findByIdAndDelete(eventId);

		if (!deletedEvent) {
			return res.status(404).json({ error: 'Event not found' });
		}

		// Notify all attendees about the event cancellation
		const attendeeUserIds = deletedEvent.attendees.map((attendee) =>
			attendee.toString()
		);

		const notificationData = await NotificationModel.create({
			userId: attendeeUserIds,
			message: eventId,
			type: NotificationType.EVENT_CANCELLED,
		});

		await notificationData.save();

		// Emit the notification to all attendees' sockets
		attendeeUserIds.forEach((userId) => {
			const attendeeSocket = findSocket(userId);

			if (attendeeSocket) {
				attendeeSocket.emit('getNotification', notificationData);
			} else {
				// If the socket is not available, store the notification as pending
				userSocketMap[userId]?.notifications.push(notificationData);
			}
		});

		res.json({ message: 'Event deleted successfully' });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
