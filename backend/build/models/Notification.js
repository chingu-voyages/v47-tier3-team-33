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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var NotificationType;
(function (NotificationType) {
    NotificationType["EVENT_CANCELLED"] = "event_cancelled";
    NotificationType["EVENT_UPDATED"] = "event_updated";
    NotificationType["EVENT_STARTING_SOON"] = "event_starting_soon";
    NotificationType["EVENT_ENDED"] = "event_ended";
    NotificationType["EVENT_RECOMMENDATION"] = "event_recommendation";
    NotificationType["NEW_INBOX_MESSAGE"] = "new_inbox_message";
    NotificationType["EVENT_BOOKED"] = "event_booked";
    NotificationType["EVENT_UNBOOKED"] = "event_unbooked";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
const NotificationSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: { type: String, required: true },
    type: {
        type: String,
        enum: Object.values(NotificationType),
        required: true,
    },
    read: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'read'], default: 'pending' },
}, {
    timestamps: true,
});
const NotificationModel = mongoose_1.default.model('Notification', NotificationSchema);
exports.default = NotificationModel;
