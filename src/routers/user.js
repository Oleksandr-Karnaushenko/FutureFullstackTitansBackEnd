import { Router } from 'express';

import isValidId from '../middlewares/isValidId.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

import * as userControllers from '../controllers/user.js';
import { upload } from '../middlewares/multer.js';

const userRouter = Router();

userRouter.get(
  '/:userId',
  isValidId,
  ctrlWrapper(userControllers.getUserInfoController),
);

userRouter.patch(
  '/avatar/:userId',
  isValidId,
  upload.single('avatarUrl'),
  ctrlWrapper(userControllers.uploadAvatarController),
);

userRouter.patch(
  '/:userId',
  isValidId,
  ctrlWrapper(userControllers.patchUserInfoController),
);

export default userRouter;
