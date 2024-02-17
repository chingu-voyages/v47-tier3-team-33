import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from './User';
interface ITicket {
	type: string;
	price: number;
}

export interface IEvent extends Document {
	title: string;
	category: Types.ObjectId;
	startDate: Date;
	endDate: Date;
	location: string;
	description: string;
	venue: string;
	organizer: Types.ObjectId | IUser;
	image: string;
	tickets: ITicket[];
	attendees: Types.ObjectId[];
}

const TicketSchema: Schema = new Schema({
	type: { type: String, required: true },
	price: { type: Number, required: true },
});

const EventSchema: Schema = new Schema({
	title: { type: String, required: true },
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	location: { type: String, required: true },
	description: { type: String, required: true },
	venue: { type: String, required: false },
	organizer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	image: { type: String, required: false },
	tickets: [{ type: [TicketSchema], required: true }],
	attendees: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: false,
		},
	],
});

interface ICategory extends Document {
	name: string;
	description: string;
	events: Types.ObjectId[];
	image: string;
}

const CategorySchema: Schema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
	image: { type: String, required: true },
});

const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);
const EventModel = mongoose.model<IEvent>('Event', EventSchema);

export { CategoryModel, EventModel };
