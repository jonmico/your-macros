import { Router } from 'express';
import { getFoods, createFood, getFoodById } from '../controllers/food';

const router = Router();

router.get('/', getFoods);
router.get('/:id', getFoodById);
router.post('/new', createFood);

export default router;
