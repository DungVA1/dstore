import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, KafkaOptions, Transport } from '@nestjs/microservices';
import { CacheModule } from '@shared/cache/cache.module';
import { LoggerService } from '@shared/logger/logger.service';
import { TokenModule } from '@shared/token/token.module';

import { AuthMSController } from './auth-ms.controller';
import { AuthMSService } from './auth-ms.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService): KafkaOptions => {
          const appName: string = configService.get<string>('app.auth.name')!;

          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: `${appName}-gw-consumer-client-id`,
                brokers: configService.get<string[]>('kafka.brokers') || [],
              },
              producer: {
                allowAutoTopicCreation: true,
              },
              consumer: {
                allowAutoTopicCreation: true,
                groupId: `${appName}-gw-consumer-group-id`,
              },
            },
          };
        },
      },
    ]),
    TokenModule,
    CacheModule.forRoot(),
  ],
  controllers: [AuthMSController],
  providers: [AuthMSService, LoggerService],
})
export class AuthMSModule {}
