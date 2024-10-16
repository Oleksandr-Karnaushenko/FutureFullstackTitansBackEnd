import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import model from '../db/models/user.js';
const { schema } = model;
const { registerSchema, loginSchema } = schema;
import validateBody from '../middlewares/validateBody.js';
const router = Router();

//register
router.post('/register', validateBody(registerSchema), ctrlWrapper(register));
//login
router.post('/login', validateBody(loginSchema), ctrlWrapper(login));

//logout
router.post('/logout', ctrlWrapper(logout));

export default router;
