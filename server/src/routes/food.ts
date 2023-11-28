import { Router } from 'express';
import {
  getFoods,
  createFood,
  getFoodById,
  getFoodByText,
} from '../controllers/food';

const router = Router();

router.get('/', getFoods);
router.get('/search', getFoodByText);
router.get('/:id', getFoodById);
router.post('/new', createFood);

export default router;
