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
          const appName: string = configService.get<string>('app.user.name')!;
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: `${appName}-gw-consumer-client-id`,
                brokers: configService.get<string[]>('kafka.brokers') || [],
              },
              consumer: {
                allowAutoTopicCreation: true,
                groupId: `${appName}-gw-consumer-group-id`,
              },
              producer: {
                allowAutoTopicCreation: true,
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
