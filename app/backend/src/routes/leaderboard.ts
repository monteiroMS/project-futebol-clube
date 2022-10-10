import * as express from 'express';
import { LeaderboardController } from '../database/controllers';

const router = express.Router();

const controller = new LeaderboardController();

router
  .get('/leaderboard', controller.getBothLeaderboard)
  .get('/leaderboard/home', controller.getHomeLeaderboard)
  .get('/leaderboard/away', controller.getAwayLeaderboard);

export default router;
