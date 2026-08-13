"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.createUser = exports.listUsers = void 0;
const User_1 = require("../models/User");
const listUsers = async (_req, res, next) => {
    try {
        const users = await User_1.User.find().populate('team', 'name').sort({ createdAt: -1 });
        res.json(users);
    }
    catch (error) {
        next(error);
    }
};
exports.listUsers = listUsers;
const createUser = async (req, res, next) => {
    try {
        const { name, email, grade } = req.body;
        const user = await User_1.User.create({ name, email, grade });
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
const getUserById = async (req, res, next) => {
    try {
        const user = await User_1.User.findById(req.params.id).populate('team', 'name');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserById = getUserById;
//# sourceMappingURL=userController.js.map