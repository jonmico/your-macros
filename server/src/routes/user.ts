import { Router } from 'express';
import {
  createLog,
  getSession,
  login,
  logout,
  register,
} from '../controllers/user';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/log/new', createLog);
router.get('/', getSession);

export default router;
