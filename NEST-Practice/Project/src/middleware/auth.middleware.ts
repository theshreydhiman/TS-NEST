import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../User/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly UserService: UserService) { }

  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;

    try {
      const decoded: any = jwt.verify(token, 'mySecretKey');

      const idx = this.UserService.users.findIndex((u) => u.Id == decoded.Id);

      console.log(this.UserService.users);

      if (!this.UserService.users[idx].Token) {
        throw new UnauthorizedException('Please login again.');
      }

      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}