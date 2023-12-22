import { NextFunction, Request, Response } from 'express';
import IUser from '../types/user';
import AppError from '../app-error';
import User from '../models/user';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

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

declare module 'express-session' {
  interface SessionData {
    userId: mongoose.Types.ObjectId | null;
  }
}

interface LoginBody {
  username: string;
  password: string;
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password }: LoginBody = req.body;

    const user = await User.findOne({ email: username });

    if (!user) {
      throw new AppError('User not found.', 400);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new AppError('Username or password is incorrect.', 400);
    }

    req.session.userId = user._id;

    res.json({
      isAuthenticated: true,
      user: { _id: user._id, email: user.email, logs: user.logs },
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    req.session.userId = null;

    res.json({ message: 'Logged out.' });
  } catch (err) {
    next(err);
  }
}

export async function getSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.session.userId) {
      const user = await User.findById(req.session.userId);

      if (!user) {
        throw new AppError('User not found', 400);
      }

      res.json({
        isAuthenticated: true,
        user: { _id: user._id, email: user.email, logs: user.logs },
      });
    } else {
      res.json({ activeSession: false, user: {} });
    }
  } catch (err) {
    next(err);
  }
}
