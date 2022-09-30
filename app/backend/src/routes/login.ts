import * as express from 'express';
import { decodeJwt } from '../middlewares/auth';
import { UserController } from '../database/controllers';
import { authenticator, loginValidator } from '../middlewares';

const router = express.Router();

const userController = new UserController();

router
  .post('/login', loginValidator, userController.login)
  .get('/login/validate', authenticator, (req, res) => {
    const { authorization } = req.headers;

    if (authorization) {
      const { role } = decodeJwt(authorization);

      return res.status(200).json({ role });
    }
  });

export default router;
