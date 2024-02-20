import express from 'express';
import {
	bookEvent,
	createEvent,
	deleteEventById,
	getEventById,
	getEvents,
	updateEventById,
	uploadEventImage,
	unBookEvent,
} from '../controllers/Events';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:eventId', updateEventById);
router.delete('/:id', deleteEventById);
router.post('/', uploadEventImage.single('image'), createEvent);
router.post('/rsvp', bookEvent);
router.post('/events/unbook', unBookEvent);

export default router;
