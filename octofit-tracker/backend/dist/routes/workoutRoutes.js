"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workoutController_1 = require("../controllers/workoutController");
const workoutRouter = (0, express_1.Router)();
workoutRouter.get('/', workoutController_1.listWorkouts);
workoutRouter.post('/', workoutController_1.createWorkout);
workoutRouter.get('/suggestions/:userId', workoutController_1.getWorkoutSuggestions);
exports.default = workoutRouter;
//# sourceMappingURL=workoutRoutes.js.map