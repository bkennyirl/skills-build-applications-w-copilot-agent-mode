"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthController_1 = require("../controllers/healthController");
const activityRoutes_1 = __importDefault(require("./activityRoutes"));
const leaderboardRoutes_1 = __importDefault(require("./leaderboardRoutes"));
const teamRoutes_1 = __importDefault(require("./teamRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const workoutRoutes_1 = __importDefault(require("./workoutRoutes"));
const apiRouter = (0, express_1.Router)();
apiRouter.get('/health', healthController_1.getHealth);
apiRouter.use('/users', userRoutes_1.default);
apiRouter.use('/teams', teamRoutes_1.default);
apiRouter.use('/activities', activityRoutes_1.default);
apiRouter.use('/leaderboard', leaderboardRoutes_1.default);
apiRouter.use('/workouts', workoutRoutes_1.default);
exports.default = apiRouter;
//# sourceMappingURL=index.js.map