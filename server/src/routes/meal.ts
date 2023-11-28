import { Router } from 'express';
import { createMeal, getMeal } from '../controllers/meal';

const router = Router();

router.post('/new', createMeal);

router.get('/:id', getMeal);

export default router;
