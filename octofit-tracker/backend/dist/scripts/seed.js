"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = require("../models/Activity");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            Activity_1.Activity.deleteMany({}),
            Team_1.Team.deleteMany({}),
            User_1.User.deleteMany({}),
            Workout_1.Workout.deleteMany({})
        ]);
        const [octoRunners, powerPods] = await Team_1.Team.create([
            {
                name: 'Octo Runners',
                description: 'Distance-focused cardio team',
                members: []
            },
            {
                name: 'Power Pods',
                description: 'Strength and conditioning team',
                members: []
            }
        ]);
        const users = await User_1.User.create([
            {
                name: 'Avery Park',
                email: 'avery@example.com',
                grade: '10',
                team: octoRunners._id,
                totalPoints: 0
            },
            {
                name: 'Jordan Reed',
                email: 'jordan@example.com',
                grade: '11',
                team: powerPods._id,
                totalPoints: 0
            }
        ]);
        octoRunners.members = [users[0]._id];
        powerPods.members = [users[1]._id];
        await Promise.all([octoRunners.save(), powerPods.save()]);
        const activities = await Activity_1.Activity.create([
            {
                user: users[0]._id,
                type: 'running',
                durationMinutes: 30,
                caloriesBurned: 280,
                points: 46,
                performedAt: new Date()
            },
            {
                user: users[1]._id,
                type: 'strength',
                durationMinutes: 40,
                caloriesBurned: 250,
                points: 52,
                performedAt: new Date()
            }
        ]);
        users[0].totalPoints = activities[0].points;
        users[1].totalPoints = activities[1].points;
        await Promise.all([users[0].save(), users[1].save()]);
        await Workout_1.Workout.create([
            {
                title: 'Starter Circuit',
                level: 'beginner',
                category: 'full-body',
                durationMinutes: 20,
                description: 'Simple bodyweight workout focused on consistency.'
            },
            {
                title: 'Pace Builder Run',
                level: 'intermediate',
                category: 'cardio',
                durationMinutes: 30,
                description: 'Intervals to improve speed and endurance.'
            },
            {
                title: 'Athlete Strength Block',
                level: 'advanced',
                category: 'strength',
                durationMinutes: 45,
                description: 'High-intensity strength progression with core finishers.'
            }
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
//# sourceMappingURL=seed.js.map