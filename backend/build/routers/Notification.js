"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Notifications_1 = require("../controllers/Notifications");
const router = express_1.default.Router();
router.get('/', Notifications_1.getAllNotification);
router.get('/:userId', Notifications_1.getNotificationByUserId);
router.get('/pending/:userId', Notifications_1.getUserPendingNotifications);
router.put('/:id', Notifications_1.updateNotification);
router.delete('/:id', Notifications_1.deleteNotification);
exports.default = router;
