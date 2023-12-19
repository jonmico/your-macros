import { NextFunction, Request, Response } from 'express';
import IUser from '../types/user';
import AppError from '../app-error';
import User from '../models/user';
import bcrypt from 'bcrypt';

interface IBody {
  user: IUser;
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user }: IBody = req.body;

    if (!user) {
      throw new AppError('No user provided.', 400);
    }

    bcrypt.hash(user.password, 12, async (err, hash) => {
      if (err) {
        next(err);
      }
      const newUser = await User.create({ ...user, password: hash });
      res.status(201).json({ newUser });
    });
  } catch (err) {
    next(err);
  }
}
