import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@shared/cache/cache.module';
import { AppConfigModule } from '@shared/config/config.module';
import { LoggerService } from '@shared/logger/logger.service';
import { TokenModule } from '@shared/token/token.module';

import { AuthGuard } from './guards/authentication.guard';
import { RateLimitGuard } from './guards/rate-limit.guard';
import { AuthMSModule } from './microservices/auth-ms/auth-ms.module';
import { UserMSModule } from './microservices/user-ms/user-ms.module';

@Module({
  imports: [
    AppConfigModule,
    TokenModule,
    UserMSModule,
    AuthMSModule,
    CacheModule,
  ],
  providers: [
    LoggerService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
  controllers: [],
})
export class GatewayModule {}
