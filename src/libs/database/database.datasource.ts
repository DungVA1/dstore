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
  entities: [UserModel],
  migrations: ['dist/libs/database/migrations/*.js'],
  synchronize: false,
};

export const dataSource = new DataSource(dataSourceOptions);
