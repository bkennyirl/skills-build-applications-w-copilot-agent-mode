import { NextFunction, Request, Response } from 'express';
import { Activity } from '../models/Activity';
import { User } from '../models/User';

export const listActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.query;
    const query = typeof userId === 'string' ? { user: userId } : {};

    const activities = await Activity.find(query)
      .populate('user', 'name email')
      .sort({ performedAt: -1 });

    res.json(activities);
  } catch (error) {
    next(error);
  }
};

export const logActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, type, durationMinutes, caloriesBurned } = req.body;

    const points = Math.max(1, Math.round((Number(durationMinutes) + Number(caloriesBurned) / 10) * 0.8));
    const activity = await Activity.create({
      user,
      type,
      durationMinutes,
      caloriesBurned,
      points
    });

    await User.findByIdAndUpdate(user, { $inc: { totalPoints: points } });

    const populatedActivity = await Activity.findById(activity._id).populate('user', 'name email');
    res.status(201).json(populatedActivity ?? activity);
  } catch (error) {
    next(error);
  }
};