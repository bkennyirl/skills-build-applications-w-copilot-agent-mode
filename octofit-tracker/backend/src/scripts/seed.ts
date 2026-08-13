import mongoose from 'mongoose';
import { Activity } from '../models/Activity';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const [octoRunners, powerPods] = await Team.create([
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

    const users = await User.create([
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

    const activities = await Activity.create([
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

    await Workout.create([
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
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
