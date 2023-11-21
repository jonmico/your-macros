import { Router } from 'express';
import { getFoods, createFood } from '../controllers/food';

const router = Router();

router.get('/', getFoods);

router.post('/new', createFood);

export default router;
