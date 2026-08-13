"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logActivity = exports.listActivities = void 0;
const Activity_1 = require("../models/Activity");
const User_1 = require("../models/User");
const listActivities = async (req, res, next) => {
    try {
        const { userId } = req.query;
        const query = typeof userId === 'string' ? { user: userId } : {};
        const activities = await Activity_1.Activity.find(query)
            .populate('user', 'name email')
            .sort({ performedAt: -1 });
        res.json(activities);
    }
    catch (error) {
        next(error);
    }
};
exports.listActivities = listActivities;
const logActivity = async (req, res, next) => {
    try {
        const { user, type, durationMinutes, caloriesBurned } = req.body;
        const points = Math.max(1, Math.round((Number(durationMinutes) + Number(caloriesBurned) / 10) * 0.8));
        const activity = await Activity_1.Activity.create({
            user,
            type,
            durationMinutes,
            caloriesBurned,
            points
        });
        await User_1.User.findByIdAndUpdate(user, { $inc: { totalPoints: points } });
        const populatedActivity = await Activity_1.Activity.findById(activity._id).populate('user', 'name email');
        res.status(201).json(populatedActivity ?? activity);
    }
    catch (error) {
        next(error);
    }
};
exports.logActivity = logActivity;
//# sourceMappingURL=activityController.js.map