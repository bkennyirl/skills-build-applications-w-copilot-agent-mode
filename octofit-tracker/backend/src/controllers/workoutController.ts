import { NextFunction, Request, Response } from 'express';
import { Activity } from '../models/Activity';
import { Workout, WorkoutLevel } from '../models/Workout';

const levelFromRecentActivity = (totalPoints: number): WorkoutLevel => {
  if (totalPoints >= 120) {
    return 'advanced';
  }

  if (totalPoints >= 60) {
    return 'intermediate';
  }

  return 'beginner';
};

export const listWorkouts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const workouts = await Workout.find().sort({ level: 1, durationMinutes: 1 });
    res.json(workouts);
  } catch (error) {
    next(error);
  }
};

export const createWorkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
};

export const getWorkoutSuggestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recentActivities = await Activity.find({ user: req.params.userId })
      .sort({ performedAt: -1 })
      .limit(7)
      .select('points');

    const recentPoints = recentActivities.reduce((sum, activity) => sum + activity.points, 0);
    const level = levelFromRecentActivity(recentPoints);

    const workouts = await Workout.find({ level }).limit(5);

    res.json({
      level,
      recentPoints,
      suggestions: workouts
    });
  } catch (error) {
    next(error);
  }
};