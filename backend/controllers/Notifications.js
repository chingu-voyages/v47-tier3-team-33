"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPendingNotifications = exports.getNotificationByUserId = exports.createNotification = exports.deleteNotification = exports.updateNotification = exports.getAllNotification = void 0;
const Notification_1 = __importDefault(require("../models/Notification"));
const server_1 = require("../server");
const mongoose_1 = __importDefault(require("mongoose"));
const getAllNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        console.log(userId);
        const notifications = yield Notification_1.default.find({ userId });
        res.status(200).json(notifications);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllNotification = getAllNotification;
const updateNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notificationId = req.params.id;
        const { status } = req.body;
        const existingNotification = yield Notification_1.default.findById(notificationId);
        if (!existingNotification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        yield Notification_1.default.findByIdAndUpdate(notificationId, { status });
        res.status(200).json({ message: 'Notification updated successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateNotification = updateNotification;
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notificationId = req.params.id;
        const removedNotification = yield Notification_1.default.findByIdAndDelete(notificationId);
        if (!removedNotification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification removed successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteNotification = deleteNotification;
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, message, type } = req.body;
        const newNotification = new Notification_1.default({ userId, message, type });
        yield newNotification.save();
        server_1.io.emit('getNotification', newNotification);
        res.status(201).json(newNotification);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createNotification = createNotification;
const getNotificationByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const allNotifications = yield Notification_1.default.find();
        const userNotifications = allNotifications.filter((notification) => (notification === null || notification === void 0 ? void 0 : notification.userId) !== userId);
        res.status(200).json(userNotifications);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getNotificationByUserId = getNotificationByUserId;
const getUserPendingNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    if (!userId || !mongoose_1.default.isValidObjectId(userId)) {
        return res.status(400).json({ error: 'Invalid userId' });
    }
    try {
        const pendingNotifications = yield (0, server_1.getPendingNotifications)(userId);
        // Handle and send response with pendingNotifications
        res.status(200).json(pendingNotifications);
    }
    catch (error) {
        console.error('Error handling notification request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getUserPendingNotifications = getUserPendingNotifications;
