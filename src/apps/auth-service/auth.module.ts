import { EncryptionLib } from '@libs/encrypt/encryption.lib';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@shared/config/config.module';
import { DatabaseModule } from '@shared/database/database.module';
import { GeneratorModule } from '@shared/generator/generator.module';
import { LoggerService } from '@shared/logger/logger.service';
import { NotificationModule } from '@shared/notification/notification.module';
import { TokenModule } from '@shared/token/token.module';

import { LoginHandler } from './application/command/login/login.handler';
import { LogoutHandler } from './application/command/logout/logout.handler';
import { RefreshTokenHandler } from './application/command/refresh-token/refresh-token.handler';
import { RegisterHandler } from './application/command/register/register.handler';
import { ResendCodeHandler } from './application/command/resend-code/resend-code.handler';
import { VerifyTokenHandler } from './application/command/verify/verify.handler';
import { AccountRepository } from './infrastructure/account.repository';
import { AccountModel } from './infrastructure/models/account.model';
import { RefreshTokenModel } from './infrastructure/models/refresh-token.model';
import { VerificationTokenModel } from './infrastructure/models/verification-code.model';
import { AuthController } from './presentation/auth.controller';

@Module({
  imports: [
    CqrsModule,
    AppConfigModule,
    DatabaseModule,
    TypeOrmModule.forFeature([
      AccountModel,
      VerificationTokenModel,
      RefreshTokenModel,
    ]),
    GeneratorModule,
    NotificationModule,
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [
    EncryptionLib,
    {
      provide: LoggerService,
      useValue: new LoggerService('AuthModule'),
    },
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository,
    },
    LoginHandler,
    RegisterHandler,
    ResendCodeHandler,
    VerifyTokenHandler,
    RefreshTokenHandler,
    LogoutHandler,
  ],
})
export class AuthModule {}
