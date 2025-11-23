import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, KafkaOptions, Transport } from '@nestjs/microservices';

import { UserMSController } from './user-ms.controller';
import { UserMSService } from './user-ms.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService): KafkaOptions => {
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'user-client-id',
                brokers: configService.get<string[]>('kafka.brokers') || [],
              },
              consumer: {
                groupId: 'user-consumer-group-id',
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [UserMSController],
  providers: [UserMSService],
})
export class UserMSModule {}
