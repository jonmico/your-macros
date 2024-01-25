import { NextFunction, Request, Response } from 'express';
import AppError from '../app-error';
import User from '../models/user';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import ILog from '../types/log';
import IMeal from '../types/meal';
import calcLogCalsMacros from '../utils/calcLogCalsMacros';

interface IRegisterBody {
  user: {
    email: string;
    password: string;
    calories: number;
    macros: {
      fat: number;
      carbs: number;
      protein: number;
    };
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
        user: {
          _id: newUser._id,
          email: newUser.email,
          logs: newUser.logs,
          calories: newUser.calories,
          macros: newUser.macros,
        },
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
  email: string;
  password: string;
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password }: LoginBody = req.body;
    const user = await User.findOne({ email }).exec();

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
      user: {
        _id: user._id,
        email: user.email,
        logs: user.logs,
        calories: user.calories,
        macros: user.macros,
      },
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
        user: {
          _id: user._id,
          email: user.email,
          logs: user.logs,
          calories: user.calories,
          macros: user.macros,
        },
      });
    } else {
      res.json({ isAuthenticated: false, user: null });
    }
  } catch (err) {
    next(err);
  }
}

interface ILogBody {
  log: ILog;
}

interface IAddMealToLogBody {
  meal: IMeal;
  userId: mongoose.Types.ObjectId;
  logId: string;
}

export async function addMealToLog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { logId } = req.params;
    const { meal, userId }: IAddMealToLogBody = req.body;
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const logIndex = user.logs.findIndex((log) => log._id.toString() === logId);
    user.logs[logIndex].meals.push(meal);
    const result = calcLogCalsMacros(user.logs[logIndex]);

    if (result.message) {
      throw new AppError(result.message, 400);
    }

    if (result.macros && result.calories) {
      user.logs[logIndex].macros = result.macros;
      user.logs[logIndex].calories = result.calories;
      await user.save();
    }

    res.json({
      user: {
        _id: user._id,
        email: user.email,
        logs: user.logs,
        calories: user.calories,
        macros: user.macros,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function createLog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { log }: ILogBody = req.body;
    const user = await User.findById(log.author);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    user.logs.push(log);
    await user.save();

    res.json({
      user: {
        _id: user._id,
        email: user.email,
        logs: user.logs,
        calories: user.calories,
        macros: user.macros,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteLog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      logId,
      userId,
    }: {
      logId: string;
      userId: mongoose.Schema.Types.ObjectId;
    } = req.body;
    const user = await User.findById(userId);

    if (!user) throw new AppError('User not found.', 404);
    const filteredLogs = user.logs.filter(
      (log) => log._id.toString() !== logId
    );
    user.logs = filteredLogs;
    await user.save();

    res.json({
      user: {
        _id: user._id,
        email: user.email,
        logs: user.logs,
        calories: user.calories,
        macros: user.macros,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteMealFromLog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json({ message: 'hello from deleteMealFromLog function' });
  } catch (err) {
    next(err);
  }
}
