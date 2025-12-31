import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../../User/user.service';
import { User } from 'src/User/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly UserService: UserService, @Inject('User-Repo') private userRepo: typeof User) {}

  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;

    try {
      const decoded: any = jwt.verify(token, 'mySecretKey');

      const data = await this.userRepo.findOne<User>({where:{Email: decoded.Email}});

      if (!data?.dataValues.Token) {
        throw new UnauthorizedException('Please login again.');
      }

      req.user = decoded;
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
