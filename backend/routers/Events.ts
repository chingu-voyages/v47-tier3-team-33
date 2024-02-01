import express from 'express';
import { bookEvent, createEvent, getEvents } from '../controllers/Events';

const router = express.Router();

router.get('/', getEvents);
router.post('/', createEvent);
router.post('/rsvp', bookEvent);

export default router;
