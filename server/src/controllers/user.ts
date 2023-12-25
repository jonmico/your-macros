import { NextFunction, Request, Response } from 'express';
import AppError from '../app-error';
import User from '../models/user';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import ILog from '../types/log';

interface IRegisterBody {
  user: {
    email: string;
    password: string;
  };
}

// TODO: Fix crashing. Temporary solution.
export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user }: IRegisterBody = req.body;

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
      req.session.userId = newUser._id;

      res.status(201).json({
        successfulRegister: true,
        isAuthenticated: true,
        user: { _id: newUser._id, email: newUser.email, logs: newUser.logs },
      });
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

    const user = await User.findOne({ email: username }).exec();

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
    if (!req.session.userId) {
      throw new AppError('No user currently logged in.', 400);
    }

    req.session.userId = null;

    res.json({ successfulLogout: true });
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
      const user = await User.findById(req.session.userId).exec();

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

interface ILogBody {
  log: ILog;
}

export async function createLog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { log }: ILogBody = req.body;

    const user = await User.findByIdAndUpdate(
      log.author,
      {
        $push: { logs: log },
        $set: { currentLog: log },
      },
      { new: true }
    );

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    res.json({ logs: user?.logs });
  } catch (err) {
    next(err);
  }
}
