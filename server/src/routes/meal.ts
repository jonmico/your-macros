import { Router } from 'express';
import { createMeal } from '../controllers/meal';

const router = Router();

router.post('/new', createMeal);

export default router;
