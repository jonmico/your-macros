import { Router } from 'express';
import AppError from '../app-error';

const router = Router();

router.post('/new', (req, res, next) => {
  try {
    const { food } = req.body;

    if (!food) {
      throw new AppError('Invalid input', 403);
    }

    res.json(food);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
