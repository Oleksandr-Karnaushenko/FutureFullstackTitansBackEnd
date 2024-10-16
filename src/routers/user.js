import { Router } from 'express';

import { getUserInfoController } from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/users/:userId', getUserInfoController);

export default userRouter;
