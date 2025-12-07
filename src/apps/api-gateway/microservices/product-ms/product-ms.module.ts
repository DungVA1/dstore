import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, KafkaOptions, Transport } from '@nestjs/microservices';

import { ProductMSController } from './product-ms.controller';
import { ProductMSService } from './product-ms.service';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'PRODUCT_SERVICE',
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService): KafkaOptions => {
            const appName: string =
              configService.get<string>('app.product.name')!;
            return {
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: `${appName}-gw-consumer-client-id`,
                  brokers: configService.get<string[]>('kafka.brokers') || [],
                },
                consumer: {
                  groupId: `${appName}-gw-consumer-group-id`,
                  allowAutoTopicCreation: true,
                },
                producer: {
                  allowAutoTopicCreation: true,
                },
              },
            };
          },
        },
      ],
    }),
  ],
  controllers: [ProductMSController],
  providers: [ProductMSService],
})
export class ProductMSModule {}
