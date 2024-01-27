import mongoose, {Schema, Document} from 'mongoose';

interface ITicket {
  type: string;
  price: number;
}

interface IEvent extends Document {
    title: string;
    date: Date;
    location: string;
    description: string;
    image: string;
	tickets: ITicket[];
}

const TicketSchema: Schema = new Schema({
    type: { type: String, required: true},
    price: { type: Number, required: true}
})

const EventSchema: Schema = new Schema({
    title: { type: String, required: true},
    date: { type: Date, required: true},
    location: { type: String, required: true},
    description: { type: String, required: true},
    image: { type: String, required: true},
	tickets: {type: [TicketSchema], required: true}
})

const EventModel = mongoose.model<IEvent>('Event', EventSchema)

export default EventModel;