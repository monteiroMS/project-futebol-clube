import { Request, Response } from 'express';
import { TeamService } from '../services';

export default class TeamController {
  constructor(
    private _service = new TeamService(),
  ) {}

  public getAll = async (_req: Request, res: Response) => {
    try {
      const teams = await this._service.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    }
  };
}
