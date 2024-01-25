import { Router } from 'express';
import {
  addMealToLog,
  createLog,
  deleteLog,
  getSession,
  login,
  logout,
  register,
  deleteMealFromLog,
} from '../controllers/user';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/log/new', createLog);
router.post('/log/:logId/add-meal', addMealToLog);
router.post('/log/:logId/delete', deleteLog);
router.post('/log/:logId/delete-meal/:mealId', deleteMealFromLog);
router.get('/', getSession);

export default router;
