import { Router } from 'express';

import { getUserInfoController } from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/:userId', getUserInfoController);

export default userRouter;
