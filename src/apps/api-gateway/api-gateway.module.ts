import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppConfigModule } from '@shared/config/config.module';
import { LoggerService } from '@shared/logger/logger.service';
import { TokenModule } from '@shared/token/token.module';

import { AuthGuard } from './guards/authentication.guard';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';

@Module({
  imports: [
    AppConfigModule,
    TokenModule,
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('app.auth.host'),
            port: configService.get<number>('app.auth.port'),
          },
        }),
      },
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('app.user.host'),
            port: configService.get<number>('app.user.port'),
          },
        }),
      },
    ]),
  ],
  providers: [
    ApiGatewayService,
    LoggerService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [ApiGatewayController],
})
export class ApiGatewayModule {}
