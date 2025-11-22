import { AccountModel } from '@apps/auth-service/infrastructure/models/account.model';
import { RefreshTokenModel } from '@apps/auth-service/infrastructure/models/refresh-token.model';
import { VerificationTokenModel } from '@apps/auth-service/infrastructure/models/verification-code.model';
import { UserModel } from '@apps/user-service/infrastructure/user.model';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({ path: '.env' });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST,
  port: +(process.env.POSTGRESQL_PORT || 5432),
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  entities: [
    UserModel,
    AccountModel,
    VerificationTokenModel,
    RefreshTokenModel,
  ],
  migrations: ['dist/apps/**/infrastructure/migrations/*.js'],
  synchronize: false,
};

export const dataSource = new DataSource(dataSourceOptions);
