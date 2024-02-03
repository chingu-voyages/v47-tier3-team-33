import mongoose, {Schema, Document, Types} from 'mongoose';

interface ITicket {
  type: string;
  price: number;
}

export interface IEvent extends Document {
    title: string;
    category: Types.ObjectId
	startDate: Date;
    endDate: Date;
    location: string;
    description: string;
	organizer: string;
    image: string;
	tickets: ITicket[];
	attendees: number;
}

const TicketSchema: Schema = new Schema({
    type: { type: String, required: true},
    price: { type: Number, required: true}
})

const EventSchema: Schema = new Schema({
    title: { type: String, required: true},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    startDate: { type: Date, required: true},
    endDate: { type: Date, required: true},
    location: { type: String, required: true},
    description: { type: String, required: true},
    organizer: { type: String, required: true},
    image: { type: String, required: true},
	tickets: {type: [TicketSchema], required: true},
    attendees: { type: Number, required: true},
})

interface ICategory extends Document {
    name: string;
    description: string;
    events: Types.ObjectId[]; 
    image: string;
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    events:[{ type: Schema.Types.ObjectId, ref: 'Event' }],
    image: { type: String, required: true },
});

const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);
const EventModel = mongoose.model<IEvent>('Event', EventSchema)

export { CategoryModel, EventModel };