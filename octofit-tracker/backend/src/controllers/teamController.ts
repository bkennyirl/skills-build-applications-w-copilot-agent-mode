import { NextFunction, Request, Response } from 'express';
import { Team } from '../models/Team';
import { User } from '../models/User';

export const listTeams = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const teams = await Team.find().populate('members', 'name email grade').sort({ createdAt: -1 });
    res.json(teams);
  } catch (error) {
    next(error);
  }
};

export const createTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;
    const team = await Team.create({ name, description, members: [] });
    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
};

export const addMemberToTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { teamId, userId } = req.params;

    const [team, user] = await Promise.all([Team.findById(teamId), User.findById(userId)]);

    if (!team || !user) {
      res.status(404).json({ message: 'Team or user not found' });
      return;
    }

    if (!team.members.some((memberId) => memberId.equals(user._id))) {
      team.members.push(user._id);
    }

    user.team = team._id;

    await Promise.all([team.save(), user.save()]);
    res.json(team);
  } catch (error) {
    next(error);
  }
};