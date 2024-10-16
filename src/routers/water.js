import { Router } from 'express';
import authenticate from '../middlewares/authenticate.js';

const waterRouter = Router();

waterRouter.use(authenticate);

export default waterRouter;