import { Request, Response } from 'express';
import errorHandler from '../../errors/StandartTryCatchErrorHandler';
import { MatchService } from '../services';

export default class MatchController {
  constructor(
    private _service = new MatchService(),
  ) {}

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    try {
      if (!inProgress) {
        const matches = await this._service.getAll();
        return res.status(200).json(matches);
      }
      const matches = await this._service.filterByProgress(inProgress as string);
      return res.status(200).json(matches);
    } catch (error) {
      return errorHandler(error as Error, res, 500);
    }
  };
}
