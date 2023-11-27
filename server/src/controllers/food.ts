import { NextFunction, Request, Response } from 'express';
import Food from '../models/food';
import IFood from '../types/food';

interface IBody {
  food: IFood;
}

export async function getFoods(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const foods = await Food.find({});

    res.json(foods);
  } catch (err) {
    next(err);
  }
}

export async function createFood(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { food }: IBody = req.body;

    const newFood = await Food.create({
      ...food,
      name: food.name.toLowerCase(),
    });

    res.status(201).json({ newFood });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
