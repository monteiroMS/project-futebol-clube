import { Request, Response } from 'express';
import { UserService } from '../services';

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
      console.log(error);
      if (error instanceof Error) {
        return res.status(401).json({ message: error.message });
      }
    }
  };
}
