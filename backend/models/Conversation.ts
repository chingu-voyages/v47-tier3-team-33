import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IConversation extends Document {
	participants: Types.ObjectId[];
	messages: Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}

const ConversationSchema: Schema = new Schema({
	participants: [
		{ type: mongoose.Types.ObjectId, ref: 'User', required: true },
	],
	messages: [
		{ type: mongoose.Types.ObjectId, ref: 'Message', required: false },
	],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const ConversationModel = mongoose.model<IConversation>(
	'Conversation',
	ConversationSchema
);

export default ConversationModel;
