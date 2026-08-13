import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';

export const listUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().populate('team', 'name').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, grade } = req.body;
    const user = await User.create({ name, email, grade });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).populate('team', 'name');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};