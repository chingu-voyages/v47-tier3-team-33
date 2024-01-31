import express from 'express';
import cors from 'cors';
const app = express();
import connectDB from './config/db';
import dotenv from 'dotenv';
dotenv.config();
import categoryRouter from './routers/Category';

const PORT = 8000 || process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes (temp)
// const routes = require('./routes.ts');
// app.use('/api', routes);

// Mongo URL and Connection
connectDB();

// Routes
app.use('/categories', categoryRouter); 


app.listen(PORT, () => { 
	console.log(`App listening on port ${PORT}`);
});