"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Events_1 = require("../controllers/Events");
const router = express_1.default.Router();
router.get('/', Events_1.getEvents);
router.get('/:id', Events_1.getEventById);
router.put('/:eventId', Events_1.updateEventById);
router.delete('/:id', Events_1.deleteEventById);
router.post('/', Events_1.uploadEventImage.single('image'), Events_1.createEvent);
router.post('/rsvp', Events_1.bookEvent);
router.post('/events/unbook', Events_1.unBookEvent);
exports.default = router;
