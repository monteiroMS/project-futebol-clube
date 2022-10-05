import * as express from 'express';
import { authenticator } from '../middlewares';
import { MatchController } from '../database/controllers';

const router = express.Router();

const controller = new MatchController();

router
  .get('/matches', controller.getAll)
  .post('/matches', authenticator, controller.create)
  .patch('/matches/:id/finish', controller.updateProgress);

export default router;
