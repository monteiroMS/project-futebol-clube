import * as express from 'express';
import { TeamController } from '../database/controllers';

const router = express.Router();

const controller = new TeamController();

router
  .get('/teams/:id', controller.getById)
  .get('/teams', controller.getAll);

export default router;
