const mongoose = require('mongoose');
import dotenv from 'dotenv';
dotenv.config();
// import mongoose from 'mongoose';
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DATABASE_URL);
		console.log(`MongoDB Connect: ${conn.connection.host}`);
		console.log(process.env.DATABASE_URL)
	} catch (error: any) {
		console.log(error.message);
		process.exit(1);
	}
};

export default connectDB;

// Wilson's reference: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
