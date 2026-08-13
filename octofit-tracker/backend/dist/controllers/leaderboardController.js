"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderboard = void 0;
const User_1 = require("../models/User");
const getLeaderboard = async (_req, res, next) => {
    try {
        const leaderboard = await User_1.User.find()
            .select('name grade totalPoints')
            .sort({ totalPoints: -1, createdAt: 1 })
            .limit(10);
        res.json(leaderboard.map((entry, index) => ({
            rank: index + 1,
            id: entry._id,
            name: entry.name,
            grade: entry.grade,
            totalPoints: entry.totalPoints
        })));
    }
    catch (error) {
        next(error);
    }
};
exports.getLeaderboard = getLeaderboard;
//# sourceMappingURL=leaderboardController.js.map