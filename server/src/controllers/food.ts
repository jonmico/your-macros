import { NextFunction, Request, Response } from 'express';
import Food from '../models/food';
import IFood from '../types/food';
import AppError from '../app-error';

interface IBody {
  food: IFood;
}

export async function getFoods(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const foods = await Food.find({}).exec();

    res.json({ foods });
  } catch (err) {
    next(err);
  }
}

export async function getFoodById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const food = await Food.findById(id).exec();

    if (!food) {
      throw new AppError('Food not found.', 404);
    }

    res.json({ food });
  } catch (err) {
    next(err);
  }
}

export async function getFoodByText(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name } = req.params;

    if (!name) {
      throw new AppError('No search text provided.', 400);
    }

    if (typeof name !== 'string') {
      throw new AppError('Search is not a string', 403);
    }

    // MongoDB search by phrase requires the \" to search by phrase.
    const foodsFromText = await Food.find({
      // eslint-disable-next-line no-useless-escape
      $text: { $search: name.includes(' ') ? `\"${name}\"` : name },
    }).exec();

    if (!foodsFromText.length) {
      throw new AppError('No foods found.', 404);
    }

    res.json({ foods: foodsFromText });
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
      brand: food.brand.toLowerCase(),
    });

    res.status(201).json({ createdFood: newFood });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
