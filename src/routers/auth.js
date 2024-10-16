import { Router } from 'express';

import {refreshController} from '../controllers/auth.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';


const authRouter = Router();

authRouter.post('/refresh', ctrlWrapper(refreshController));

export default authRouter;