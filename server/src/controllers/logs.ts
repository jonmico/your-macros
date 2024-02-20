import { Request, Response, NextFunction } from 'express';
import AppError from '../app-error';
import User from '../models/user';

export async function getUserLogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('Unable to find user with that id.', 404);
    }

    res.json({ logs: user.logs });
  } catch (err) {
    next(err);
  }
}
