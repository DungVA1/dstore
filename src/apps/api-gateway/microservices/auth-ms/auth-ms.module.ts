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
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'auth-client-id',
                brokers: configService.get<string[]>('kafka.brokers') || [],
              },
              consumer: {
                groupId: 'auth-consumer-group-id',
                allowAutoTopicCreation: true,
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
