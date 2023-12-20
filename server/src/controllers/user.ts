import { NextFunction, Request, Response } from 'express';
import IUser from '../types/user';
import AppError from '../app-error';
import User from '../models/user';
import bcrypt from 'bcrypt';

interface IBody {
  user: IUser;
}

// TODO: Fix crashing. Temporary solution.
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

    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      throw new AppError('User with email already exists.', 400);
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

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.session.number) {
      req.session.number += 1;
    } else {
      req.session.number = 1;
    }
    console.log(req.session.number);
    res.json(req.session.number);
  } catch (err) {
    next(err);
  }
}
