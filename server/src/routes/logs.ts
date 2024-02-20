import { Router } from 'express';
import { getUserLogs } from '../controllers/logs';

const router = Router();

router.get('/:userId', getUserLogs);

export default router;
