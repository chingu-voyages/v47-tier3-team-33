import mongoose, { Schema, Document } from 'mongoose';

export enum NotificationType {
	EVENT_CANCELED = 'event_canceled',
	EVENT_STARTING_SOON = 'event_starting_soon',
	EVENT_ENDED = 'event_ended',
	EVENT_RECOMMENDATION = 'event_recommendation',
	NEW_INBOX_MESSAGE = 'new_inbox_message',
}

export interface INotification extends Document {
	userId: string;
	message: string;
	type: NotificationType;
	eventId?: string;
	createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
	userId: { type: mongoose.Types.ObjectId, ref: 'User' },
	message: { type: String, required: true },
	type: { type: String, enum: Object.values(NotificationType), required: true },
	eventId: { type: mongoose.Types.ObjectId, ref: 'Event' },
	createdAt: { type: Date, default: Date.now },
});

const NotificationModel = mongoose.model<INotification>(
	'Notification',
	NotificationSchema
);

export default NotificationModel;
