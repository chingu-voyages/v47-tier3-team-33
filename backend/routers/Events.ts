import express from 'express';
import {
	bookEvent,
	createEvent,
	deleteEventById,
	getEventById,
	getEvents,
	updateEventById,
} from '../controllers/Events';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.get('/:id', updateEventById);
router.get('/:id', deleteEventById);
router.post('/', createEvent);
router.post('/rsvp', bookEvent);

export default router;
