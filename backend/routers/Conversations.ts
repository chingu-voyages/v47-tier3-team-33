const express = require('express');
const {
	createConversation,
	getAllConversationForUser,
	getMessagesInConversation,
	sendMessage,
} = require('../controllers/Conversations');

const router = express.Router();

router.post('/', createConversation);
router.post('/messages', sendMessage);
router.get('/messages/:id', getMessagesInConversation);
router.get('/user/:id', getAllConversationForUser);

export default router;
