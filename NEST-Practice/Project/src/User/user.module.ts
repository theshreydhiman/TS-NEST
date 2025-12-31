import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthMiddleware } from 'src/middleware/AuthMiddleware/auth.middleware';
import { User } from './user.entity';
import { DatabaseModule } from 'src/DB/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, {
    provide: 'User-Repo',
    useValue: User
  }],
})

export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/users', method: RequestMethod.POST },
        { path: '/users/login', method: RequestMethod.POST },
      )
      .forRoutes('users');
  }
}
