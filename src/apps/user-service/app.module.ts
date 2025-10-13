import { AppConfigModule } from '@libs/config/config.module';
import { DatabaseModule } from '@libs/database/database.module';
import { LoggerService } from '@libs/log/logger.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GetUserQueryHandler } from './application/query/get-user/execute';
import { UserModel } from './infrastructure/user.orm';
import { UserRepository } from './infrastructure/user.repository';
import { UserController } from './presentation/user.controller';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    TypeOrmModule.forFeature([UserModel]),
  ],
  controllers: [UserController],
  providers: [
    LoggerService,
    GetUserQueryHandler,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class AppModule {}
