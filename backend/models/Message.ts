import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IMessage extends Document {
	conversation: Types.ObjectId;
	sender: Types.ObjectId;
	text: string;
	createdAt: Date;
}

const MessageSchema: Schema = new Schema({
	conversation: {
		type: mongoose.Types.ObjectId,
		ref: 'Conversation',
		required: true,
	},
	sender: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
	text: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;
