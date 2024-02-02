import express from 'express';
import {
	bookEvent,
	createEvent,
	getEventById,
	getEvents,
} from '../controllers/Events';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', createEvent);
router.post('/rsvp', bookEvent);

export default router;
