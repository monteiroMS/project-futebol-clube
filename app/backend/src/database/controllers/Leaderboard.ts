import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  constructor(
    private _service = new LeaderboardService(),
  ) {}

  public getHomeLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this._service.getLeaderboard('homeTeam');
    res.status(200).json(leaderboard);
  };

  public getAwayLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this._service.getLeaderboard('awayTeam');
    res.status(200).json(leaderboard);
  };
}
