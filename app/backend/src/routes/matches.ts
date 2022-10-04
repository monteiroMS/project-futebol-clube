import * as express from 'express';
import { MatchController } from '../database/controllers';

const router = express.Router();

const controller = new MatchController();

router
  .get('/matches', controller.getAll);

export default router;
