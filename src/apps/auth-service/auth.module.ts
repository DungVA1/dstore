import { AppConfigModule } from '@libs/config/config.module';
import { DatabaseModule } from '@libs/database/database.module';
import { GeneratorModule } from '@libs/shared/generator/generator.module';
import { LoggerService } from '@libs/shared/logger/logger.service';
import { NotificationModule } from '@libs/shared/notification/notification.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoginHandler } from './application/command/login/login.handler';
import { RegisterHandler } from './application/command/register/register.handler';
import { ResendCodeHandler } from './application/command/resend-code/resend-code.handler';
import { VerifyTokenHandler } from './application/command/verify/verify.handler';
import { AccountModel } from './infrastructure/account.model';
import { AccountRepository } from './infrastructure/account.repository';
import { VerificationTokenModel } from './infrastructure/verification-code.model';
import { AuthController } from './presentation/auth.controller';

@Module({
  imports: [
    CqrsModule,
    AppConfigModule,
    DatabaseModule,
    TypeOrmModule.forFeature([AccountModel, VerificationTokenModel]),
    GeneratorModule,
    NotificationModule,
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
    ResendCodeHandler,
    VerifyTokenHandler,
  ],
})
export class AuthModule {}
