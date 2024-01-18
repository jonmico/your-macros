import { Router } from 'express';
import {
  addMealToLog,
  createLog,
  getSession,
  login,
  logout,
  register,
  selectActiveLog,
} from '../controllers/user';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/log/new', createLog);
router.post('/log/:logId/add-meal/', addMealToLog);
router.post('/log/select-active', selectActiveLog);
router.get('/', getSession);

export default router;
