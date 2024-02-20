"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../controllers/User");
const router = express_1.default.Router();
// User Routes
router.post('/', User_1.createUser); // Create User
router.post('/login', User_1.loginUser); // Login
router.post('/logout', User_1.logoutUser); // Logout
router.get('/:id', User_1.getUserById); // Get User by ID
router.put('/:id', User_1.updateUser); // Update User
router.delete('/:id', User_1.deleteUser); // Delete User
router.get('/', User_1.getUser); // Get All Users (optional)
exports.default = router;
