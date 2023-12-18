import { Router } from 'express';
import { createLog } from '../controllers/log';

const router = Router();

router.post('/new', createLog);

export default router;
