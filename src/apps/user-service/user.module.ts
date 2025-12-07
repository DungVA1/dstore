import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@shared/config/config.module';
import { DatabaseModule } from '@shared/database/database.module';
import { LoggerModule } from '@shared/logger/logger.module';

import { CreateUserHandler } from './application/command/create-user/create-user.handler';
import { DeleteUserHandler } from './application/command/delete-user/delete-user.handler';
import { UpdateUserHandler } from './application/command/update-user/update-user.handler';
import { GetUserHandler, GetUsersHandler } from './application/query';
import { UserModel } from './infrastructure/user.model';
import { UserRepository } from './infrastructure/user.repository';
import { UserController } from './presentation/user.controller';

@Module({
  imports: [
    CqrsModule,
    AppConfigModule,
    DatabaseModule,
    TypeOrmModule.forFeature([UserModel]),
    LoggerModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    GetUserHandler,
    GetUsersHandler,
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
  ],
})
export class UserAppModule {}
