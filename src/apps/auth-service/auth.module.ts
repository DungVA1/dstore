import { AppConfigModule } from '@libs/config/config.module';
import { DatabaseModule } from '@libs/database/database.module';
import { LoggerService } from '@libs/log/logger.service';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoginHandler } from './application/command/login/login.handler';
import { RegisterHandler } from './application/command/register/register.handler';
import { AccountModel } from './infrastructure/account.model';
import { AccountRepository } from './infrastructure/account.repository';
import { AuthController } from './presentation/auth.controller';

@Module({
  imports: [
    CqrsModule,
    AppConfigModule,
    DatabaseModule,
    TypeOrmModule.forFeature([AccountModel]),
  ],
  controllers: [AuthController],
  providers: [
    LoggerService,
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository,
    },
    LoginHandler,
    RegisterHandler,
  ],
})
export class AuthModule {}
