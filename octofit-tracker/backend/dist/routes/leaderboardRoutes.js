"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboardController_1 = require("../controllers/leaderboardController");
const leaderboardRouter = (0, express_1.Router)();
leaderboardRouter.get('/', leaderboardController_1.getLeaderboard);
exports.default = leaderboardRouter;
//# sourceMappingURL=leaderboardRoutes.js.map