import { Request, Response } from 'express';
import { TeamService } from '../services';
import errorHandler from '../../errors/StandartTryCatchErrorHandler';

export default class TeamController {
  constructor(
    private _service = new TeamService(),
  ) {}

  public getAll = async (_req: Request, res: Response) => {
    try {
      const teams = await this._service.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      return errorHandler(error as Error, res, 500);
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const team = await this._service.getById(Number(id));
      return res.status(200).json(team);
    } catch (error) {
      return errorHandler(error as Error, res, 404);
    }
  };
}
