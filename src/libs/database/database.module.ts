import { UserModel } from '@apps/user-service/infrastructure/user.orm';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dataSourceOptions: DataSourceOptions = {
          type: 'postgres',
          host: configService.get('database.host'),
          port: +configService.get('database.port'),
          username: configService.get('database.userName'),
          password: configService.get('database.password') as string,
          database: configService.get('database.database'),
          entities: [UserModel],
          migrations: ['dist/libs/database/migrations/*.js'],
          synchronize: false,
        };

        return dataSourceOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
