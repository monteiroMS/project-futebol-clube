import * as express from 'express';
import * as middlewares from '../middlewares';
import { MatchController } from '../database/controllers';

const router = express.Router();

const controller = new MatchController();

const createMiddlewares = [
  middlewares.authenticator,
  middlewares.blockEqualTeamId,
  middlewares.blockInvalidTeamId,
];

router
  .get('/matches', controller.getAll)
  .post('/matches', createMiddlewares, controller.create)
  .patch('/matches/:id', controller.updateGoals)
  .patch('/matches/:id/finish', controller.updateProgress);

export default router;
