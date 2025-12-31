import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { UserModule } from './User/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
