import { Router } from 'express';

import isValidId from '../middlewares/isValidId.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

import {
  getUserInfoController,
  uploadAvatarController,
} from '../controllers/user.js';
import { upload } from '../middlewares/multer.js';

const userRouter = Router();

userRouter.get('/:userId', isValidId, ctrlWrapper(getUserInfoController));

userRouter.patch(
  '/avatar/:userId',
  isValidId,
  upload.single('avatarUrl'),
  ctrlWrapper(uploadAvatarController),
);

export default userRouter;
