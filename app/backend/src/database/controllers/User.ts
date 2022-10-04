import { Request, Response } from 'express';
import { UserService } from '../services';
import errorHandler from '../../errors/StandartTryCatchErrorHandler';

export default class UserController {
  constructor(
    private _service: UserService = new UserService(),
  ) {}

  public login = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const { email, password } = req.body;
      const token = await this._service.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return errorHandler(error as Error, res, 401);
    }
  };
}
