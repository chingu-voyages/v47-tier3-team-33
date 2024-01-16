const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Mongo URL and Connection
const mongoURL = process.env.DATABASE_URL;

// Connect to Mongo
mongoose.connect(mongoURL).then(() => console.log("db connection successful"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());