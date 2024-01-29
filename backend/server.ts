const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
require('dotenv').config();
const PORT = 5000 || process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes (temp)
const routes = require('./routes.ts');
app.use('/api', routes);

// Mongo URL and Connection
connectDB();

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
