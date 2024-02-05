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
  editMealInLog,
} from '../controllers/user';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/log/new', createLog);
router.post('/log/:logId/add-meal', addMealToLog);
router.delete('/log/:logId/delete', deleteLog);
router.delete('/log/:logId/delete-meal/:mealId', deleteMealFromLog);
router.patch('/log/:logId/edit-meal/:mealId', editMealInLog);
router.get('/', getSession);

export default router;
