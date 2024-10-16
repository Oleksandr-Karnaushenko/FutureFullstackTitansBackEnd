import { Router } from 'express';

import userRouter from './user.js';

const router = Router();

router.use(userRouter);

export default router;
