import { Router } from 'express';

import isValidId from '../middlewares/isValidId.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

import * as userControllers from '../controllers/user.js';
import { upload } from '../middlewares/multer.js';
import validateBody from '../middlewares/validateBody.js';
import authenticate from '../middlewares/authenticate.js';

import {
  avatarUserUrlValidation,
  updateUserDataValidation,
  updateUserWaterIntakeValidation,
} from '../validation/usersValidation.js';

const userRouter = Router();

// userRouter.use(authenticate);

userRouter.get(
  '/:userId',
  isValidId,
  ctrlWrapper(userControllers.getUserInfoController),
);

userRouter.patch(
  '/avatar/:userId',
  isValidId,
  upload.single('avatarUrl'),
  validateBody(avatarUserUrlValidation),
  ctrlWrapper(userControllers.uploadAvatarController),
);

userRouter.patch(
  '/:userId',
  isValidId,
  validateBody(updateUserDataValidation),
  ctrlWrapper(userControllers.patchUserInfoController),
);

userRouter.patch(
  '/waterRate/:userId',
  isValidId,
  validateBody(updateUserWaterIntakeValidation),
  ctrlWrapper(userControllers.updateUserDailyWaterNormController),
);

export default userRouter;
