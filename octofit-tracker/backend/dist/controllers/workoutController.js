"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkoutSuggestions = exports.createWorkout = exports.listWorkouts = void 0;
const Activity_1 = require("../models/Activity");
const Workout_1 = require("../models/Workout");
const levelFromRecentActivity = (totalPoints) => {
    if (totalPoints >= 120) {
        return 'advanced';
    }
    if (totalPoints >= 60) {
        return 'intermediate';
    }
    return 'beginner';
};
const listWorkouts = async (_req, res, next) => {
    try {
        const workouts = await Workout_1.Workout.find().sort({ level: 1, durationMinutes: 1 });
        res.json(workouts);
    }
    catch (error) {
        next(error);
    }
};
exports.listWorkouts = listWorkouts;
const createWorkout = async (req, res, next) => {
    try {
        const workout = await Workout_1.Workout.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        next(error);
    }
};
exports.createWorkout = createWorkout;
const getWorkoutSuggestions = async (req, res, next) => {
    try {
        const recentActivities = await Activity_1.Activity.find({ user: req.params.userId })
            .sort({ performedAt: -1 })
            .limit(7)
            .select('points');
        const recentPoints = recentActivities.reduce((sum, activity) => sum + activity.points, 0);
        const level = levelFromRecentActivity(recentPoints);
        const workouts = await Workout_1.Workout.find({ level }).limit(5);
        res.json({
            level,
            recentPoints,
            suggestions: workouts
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getWorkoutSuggestions = getWorkoutSuggestions;
//# sourceMappingURL=workoutController.js.map