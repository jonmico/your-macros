import { NextFunction, Request, Response } from 'express';
import IMeal from '../types/meal';
import Meal from '../models/meal';

export async function createMeal(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { meal } = req.body;

    const newMeal = await Meal.create({
      ...meal,
      name: meal.name.toLowerCase(),
    });

    res.status(201).json(newMeal);
  } catch (err) {
    next(err);
  }
}
