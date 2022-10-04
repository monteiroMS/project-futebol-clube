import * as express from 'express';
import { TeamController } from '../database/controllers';

const router = express.Router();

const controller = new TeamController();

router
  .get('/teams', controller.getAll)
  .get('/teams/:id', controller.getById);

export default router;
