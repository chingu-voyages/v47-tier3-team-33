import { Request, Response } from 'express';
import { EventModel, IEvent } from '../models/Event';
import UserModel from '../models/User';

export const getEvents = async (req: Request, res: Response) => {
	try {
		const events = await EventModel.find({});
		res.status(200).json({ events });
	} catch (error: any) {
		console.log(error.message);
		res.status(500).json({ error: 'Internal Server Error' });
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

export const bookEvent = async (req: Request, res: Response) => {
	try {
		const { userId, eventId } = req.body;

		// Find the user by ID
		const user = await UserModel.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Update the events field with the new event ID
		user.events.push(eventId);

		// Save the updated user document
		await user.save();

		res.json({ message: 'RSVP successful' });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
