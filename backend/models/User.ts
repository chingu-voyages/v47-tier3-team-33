import mongoose, { Schema, Document, Types } from 'mongoose';
import { IMessage } from './Message';
import { NotificationType } from './Notification';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
	name: string;
	surname: string;
	email: string;
	password: string;
	profile_img: string;
	events: Types.ObjectId[];
	interests: string[];
	notifications: Array<NotificationType>;
	messages: Array<IMessage>;
}

const UserSchema: Schema = new Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	profile_img: { type: String, required: false },
	events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
	interests: { type: [String], required: false },
	notifications: [
		{ type: mongoose.Types.ObjectId, ref: 'Notification', required: false },
	],
	messages: [
		{ type: mongoose.Types.ObjectId, ref: 'Message', required: false },
	],
});

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Method to generate JWT token
UserSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, 'your_secret_key', {
		expiresIn: '1h',
	});
	return token;
};

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
