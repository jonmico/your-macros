import { Router } from 'express';
import { getSession, login, logout, register } from '../controllers/user';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/', getSession);

export default router;
