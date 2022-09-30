import * as express from 'express';
import { UserController } from '../database/controllers';
import { loginValidator } from '../middlewares';

const router = express.Router();

const userController = new UserController();

router
  .post('/login', loginValidator, userController.login);

export default router;
