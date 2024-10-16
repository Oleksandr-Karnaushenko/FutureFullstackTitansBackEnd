import { Router } from 'express';

import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshSessionController,
} from '../controllers/auth.js';

import {
  userLoginValidation,
  userRegistrationValidation,
} from '../validation/usersValidation.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';

const router = Router();

//register
router.post(
  '/register',
  validateBody(userRegistrationValidation),
  ctrlWrapper(registerUserController),
);
//login
router.post(
  '/login',
  validateBody(userLoginValidation),
  ctrlWrapper(loginUserController),
);
//logout
router.post('/logout', ctrlWrapper(logoutUserController));
//refresh
router.post('/refresh', ctrlWrapper(refreshSessionController));

export default router;
