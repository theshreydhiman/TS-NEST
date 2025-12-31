import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/User/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {

      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: config.get<string>('db_host'),
        port: config.get<number>('db_port'),
        username: config.get<string>('db_username'),
        password: config.get<string>('db_password'),
        database: config.get<string>('db_database'),
      });

      sequelize.addModels([User]);
      await sequelize.sync();

      return sequelize;
    },
  },
];