import { Router } from 'express';
import authenticate from '../middlewares/authenticate.js';
import * as waterController from "../controllers/water.js";

const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.get('/', waterController.getAllContactsController);

export default waterRouter;







