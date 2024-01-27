const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DATABASE_URL);

		console.log(`MongoDB Connect: ${conn.connection.host}`);
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

module.exports = connectDB;

// Wilson's reference: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose