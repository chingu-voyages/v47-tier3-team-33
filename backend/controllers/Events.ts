import { Request, Response } from 'express';
import { EventModel, IEvent } from '../models/Event';

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
