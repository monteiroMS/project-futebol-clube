import { NextFunction, Request, Response } from 'express';
import { MatchService } from '../database/services';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  const service = new MatchService();

  const homeTeamExists = await service.getById(homeTeam);
  const awayTeamExists = await service.getById(awayTeam);

  if (!homeTeamExists || !awayTeamExists) {
    return res.status(404).json({
      message: 'There is no team with such id!',
    });
  }

  next();
};
