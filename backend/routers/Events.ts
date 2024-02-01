import express from 'express';
import { createEvent, getEvents } from '../controllers/Events';

const router = express.Router();

router.get('/', getEvents);
router.post('/', createEvent);

export default router;
