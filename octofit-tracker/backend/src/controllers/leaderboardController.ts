import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';

export const getLeaderboard = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderboard = await User.find()
      .select('name grade totalPoints')
      .sort({ totalPoints: -1, createdAt: 1 })
      .limit(10);

    res.json(
      leaderboard.map((entry, index) => ({
        rank: index + 1,
        id: entry._id,
        name: entry.name,
        grade: entry.grade,
        totalPoints: entry.totalPoints
      }))
    );
  } catch (error) {
    next(error);
  }
};