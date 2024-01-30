const express = require('express');
const userController = require('./controllers/userController');

const router = express.Router();

// User Routes
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
// More for later...

module.exports = router;
