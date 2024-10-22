import { Router } from 'express';

import authRouter from './auth.js';
import waterRouter from './water.js';
import userRouter from './user.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/water', waterRouter);
router.use('/users', userRouter);

export default router;
