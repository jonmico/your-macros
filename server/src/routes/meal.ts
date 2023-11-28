import { Router } from 'express';
import { createMeal, getMealById } from '../controllers/meal';

const router = Router();

router.post('/new', createMeal);

router.get('/:id', getMealById);

export default router;
