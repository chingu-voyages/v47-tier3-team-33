import mongoose, { Schema, Document } from 'mongoose';

export enum NotificationType {
	EVENT_CANCELLED = 'event_cancelled',
	EVENT_UPDATED = 'event_updated',
	EVENT_STARTING_SOON = 'event_starting_soon',
	EVENT_ENDED = 'event_ended',
	EVENT_RECOMMENDATION = 'event_recommendation',
	NEW_INBOX_MESSAGE = 'new_inbox_message',
	EVENT_BOOKED = 'event_booked',
	EVENT_UNBOOKED = 'event_unbooked',
}

export interface INotification extends Document {
	userId: string;
	message: string;
	type: NotificationType;
	read: boolean;
	status: 'pending' | 'read';
}

const NotificationSchema: Schema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		message: { type: String, required: true },
		type: {
			type: String,
			enum: Object.values(NotificationType),
			required: true,
		},
		read: { type: Boolean, default: false },
		status: { type: String, enum: ['pending', 'read'], default: 'pending' },
	},
	{
		timestamps: true,
	}
);

const NotificationModel = mongoose.model<INotification>(
	'Notification',
	NotificationSchema
);

export default NotificationModel;
