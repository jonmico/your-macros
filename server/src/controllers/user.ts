import { NextFunction, Request, Response } from 'express';
import IUser from '../types/user';
import AppError from '../app-error';
import User from '../models/user';

interface IBody {
  user: IUser;
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user }: IBody = req.body;

    if (!user) {
      throw new AppError('No user provided.', 400);
    }

    const newUser = await User.create(user);

    res.status(201).json({ newUser });
  } catch (err) {
    next(err);
  }
}
