import { Request, Response } from 'express';
import { BooleanString } from '../../interfaces';
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
      const matches = await this._service.filterByProgress(inProgress as BooleanString);
      return res.status(200).json(matches);
    } catch (error) {
      return errorHandler(error as Error, res, 500);
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const newMatch = await this._service.create(req.body);
      return res.status(201).json(newMatch);
    } catch (error) {
      return errorHandler(error as Error, res, 500);
    }
  };

  public updateProgress = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this._service.updateProgress(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return errorHandler(error as Error, res, 500);
    }
  };

  public updateGoals = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this._service.updateGoals(req.body, Number(id));
      return res.status(200).json({ message: 'Score updated!' });
    } catch (error) {
      return errorHandler(error as Error, res, 500);
    }
  };
}
