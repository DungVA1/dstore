import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from '@shared/config/config.module';
import { LoggerService } from '@shared/logger/logger.service';
import { TokenModule } from '@shared/token/token.module';

import { AuthGuard } from './guards/authentication.guard';
import { AuthMSModule } from './microservices/auth-ms/auth-ms.module';
import { UserMSModule } from './microservices/user-ms/user-ms.module';

@Module({
  imports: [AppConfigModule, TokenModule, UserMSModule, AuthMSModule],
  providers: [
    LoggerService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [],
})
export class GatewayModule {}
