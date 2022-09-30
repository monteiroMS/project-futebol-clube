import { JwtPayload } from 'jsonwebtoken';

export interface iDecodedJWT extends JwtPayload {
  role: string,
}
