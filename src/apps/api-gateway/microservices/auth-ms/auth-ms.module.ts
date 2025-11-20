import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AuthMSController } from './auth-ms.controller';
import { AuthMSService } from './auth-ms.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('app.auth.host'),
            port: configService.get<number>('app.auth.msPort'),
          },
        }),
      },
    ]),
  ],
  controllers: [AuthMSController],
  providers: [AuthMSService],
})
export class AuthMSModule {}
