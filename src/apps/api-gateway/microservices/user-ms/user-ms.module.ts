import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UserMSController } from './user-ms.controller';
import { UserMSService } from './user-ms.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('app.user.host'),
            port: configService.get<number>('app.user.msPort'),
          },
        }),
      },
    ]),
  ],
  controllers: [UserMSController],
  providers: [UserMSService],
})
export class UserMSModule {}
