import { NextFunction, Request, Response } from 'express';
import IMeal from '../types/meal';
import Meal from '../models/meal';
import AppError from '../app-error';

interface IBody {
  meal: IMeal;
}

export async function getMealById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const meal = await Meal.findById(id);

    if (!meal) {
      throw new AppError('Meal not found.', 404);
    }

    res.json({ meal });
  } catch (err) {
    next(err);
  }
}

export async function createMeal(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { meal }: IBody = req.body;

    if (!meal) {
      throw new AppError('No meal provided.', 400);
    }

    const newMeal = await Meal.create({
      ...meal,
      name: meal.name.toLowerCase(),
    });

    if (!newMeal) {
      throw new AppError('Something went wrong with meal creation.', 400);
    }

    res.status(201).json({ createdMeal: newMeal });
  } catch (err) {
    next(err);
  }
}
