import { AppConfigModule } from '@libs/config/config.module';
import { DatabaseModule } from '@libs/database/database.module';
import { LoggerService } from '@libs/log/logger.service';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  controllers: [UserController],
  providers: [
    LoggerService,
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
