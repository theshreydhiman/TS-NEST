import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthMiddleware } from "src/middleware/auth.middleware";

@Module({
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: '/users', method: RequestMethod.POST },
                { path: '/users/login', method: RequestMethod.POST },
                { path: '/users', method: RequestMethod.GET }
            )
            .forRoutes('users');
    }
}
