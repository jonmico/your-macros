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

    // if (result.macros && result.calories) {
    user.logs[logIndex].macros = result.macros;
    user.logs[logIndex].calories = result.calories;
    await user.save();
    // }

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
    const {
      mealId,
      logId,
      userId,
    }: { mealId: string; logId: string; userId: string } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const logIndex = user.logs.findIndex((log) => log._id.toString() === logId);
    const filteredMeals = user.logs[logIndex].meals.filter(
      (meal) => meal._id.toString() !== mealId
    );
    user.logs[logIndex].meals = filteredMeals;

    const { macros, calories } = calcLogCalsMacros(user.logs[logIndex]);

    user.logs[logIndex].macros = macros;
    user.logs[logIndex].calories = calories;
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

export async function editMealInLog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      userId,
      logId,
      meal,
    }: { userId: string; logId: string; meal: IMeal } = req.body;

    const user = await User.findById(userId).exec();

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const log = user.logs.find((l) => l._id.toString() === logId);

    if (!log) {
      throw new AppError("We can't find that log.", 404);
    }

    const newMeals = log.meals.map((m) => {
      if (m._id.toString() === meal._id) {
        return meal;
      }
      return m;
    });

    log.meals = newMeals;

    const { macros, calories } = calcLogCalsMacros(log);
    log.calories = calories;
    log.macros = macros;

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
