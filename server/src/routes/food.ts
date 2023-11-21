import { Router } from 'express';
import { createFood } from '../controllers/food';

const router = Router();

router.post('/new', createFood);

export default router;
