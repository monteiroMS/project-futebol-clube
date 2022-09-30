import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import User from '../models/User';
import { iUser } from '../../interfaces';

const MESSAGE_INVALID_FIELDS = 'Incorrect email or password';
// const MESSAGE_ERROR_500 = 'Internal server error';
// const MESSAGE_USER_NOT_FOUND = 'User not found';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class UserService {
  constructor(
    private _model = User,
  ) {}

  private async getUser(email: string): Promise<iUser> {
    const user = await this._model.findOne({ where: { email } });
    return user as iUser;
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.getUser(email);

    if (!user) {
      throw new Error(MESSAGE_INVALID_FIELDS);
    }

    const userPassword = bcrypt.compareSync(password, user.password);

    if (!userPassword) {
      throw new Error(MESSAGE_INVALID_FIELDS);
    }

    const token = jwt.sign({ role: user.role }, secret, {
      expiresIn: '1d',
    });

    return token;
  }
}
