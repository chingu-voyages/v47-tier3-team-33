"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getAllConversationForUser = exports.getMessagesInConversation = exports.sendMessage = exports.createConversation = void 0;
const Conversation_1 = __importDefault(require("../models/Conversation"));
const User_1 = __importDefault(require("../models/User"));
const Message_1 = __importDefault(require("../models/Message"));
const server_1 = require("../server");
const Notification_1 = __importStar(require("../models/Notification"));
const createConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, eventOrganizerId } = req.body;
        if (!userId || !eventOrganizerId) {
            return res.status(400).json({ error: 'Invalid request body' });
        }
        const existingConversation = yield Conversation_1.default.findOne({
            participants: { $all: [userId, eventOrganizerId] },
        });
        if (existingConversation) {
            return res.status(200).json({ conversationId: existingConversation._id });
        }
        const newConversation = yield Conversation_1.default.create({
            participants: [userId, eventOrganizerId],
        });
        return res.status(201).json({ conversationId: newConversation._id });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createConversation = createConversation;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { conversationId, sender, text } = req.body;
        const [existingSender, existingConversation] = yield Promise.all([
            User_1.default.findById(sender),
            Conversation_1.default.findById(conversationId),
        ]);
        if (!existingSender || !existingConversation) {
            return res
                .status(400)
                .json({ error: 'Invalid sender or conversation ID' });
        }
        const newMessage = yield Message_1.default.create({
            conversation: conversationId,
            sender,
            text,
        });
        existingConversation.messages.push(newMessage._id);
        yield existingConversation.save();
        server_1.io.to(conversationId).emit('message', newMessage);
        const notificationData = yield Notification_1.default.create({
            userId: existingSender,
            message: text,
            type: Notification_1.NotificationType.NEW_INBOX_MESSAGE,
        });
        yield notificationData.save();
        server_1.io.emit('getNotification', notificationData);
        return res.status(201).json(newMessage);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.sendMessage = sendMessage;
const getMessagesInConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversationId = req.params.id;
        const existingConversation = yield Conversation_1.default.findById(conversationId).populate('messages');
        if (!existingConversation) {
            return res
                .status(404)
                .json({ error: 'Conversation not found with the provided ID' });
        }
        const messages = existingConversation.messages;
        return res.status(200).json(messages);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getMessagesInConversation = getMessagesInConversation;
const getAllConversationForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const conversations = yield Conversation_1.default.find({
            participants: userId,
        });
        return res.status(200).json(conversations);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllConversationForUser = getAllConversationForUser;
