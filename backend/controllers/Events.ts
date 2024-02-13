import { Request, Response } from 'express';
import { EventModel, IEvent } from '../models/Event';
import NotificationModel, { NotificationType } from '../models/Notification';
import UserModel from '../models/User';
import { io, userSocketMap } from '../server';
import { Socket } from 'socket.io';

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

export const createEvent = async (req: Request, res: Response) => {
	try {
		const eventData: IEvent = req.body;
		const newEvent = await EventModel.create(eventData);

		res.status(201).json({ event: newEvent });
	} catch (error: any) {
		console.log(error.message);
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
