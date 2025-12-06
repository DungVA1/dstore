import { RpcExceptionFilter } from '@libs/error-handler/rpc-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { KafkaOptions, RpcException, Transport } from '@nestjs/microservices';
import { LoggerService } from '@shared/logger/logger.service';

import { ProductModule } from './product.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  const configService = app.get(ConfigService);
  const port: number = configService.get<number>('app.product.port')!;
  const appName = configService.get<string>('app.product.name');
  const loggerService = app.get(LoggerService);
  loggerService.setContext(appName);
  app.useLogger(loggerService);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (errors) => {
        const msgs = errors
          .map((e) => Object.values(e.constraints || {}))
          .flat();
        return new RpcException({
          ok: false,
          httpStatus: 400,
          error: {
            code: 'VALIDATION_ERROR',
            message: msgs.join(', '),
          },
        });
      },
    }),
  );
  app.useGlobalFilters(new RpcExceptionFilter());

  app.connectMicroservice<KafkaOptions>(
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: `${appName}-consumer-client-id`,
          brokers: configService.get<string[]>('kafka.brokers') || [],
        },
        consumer: {
          groupId: `${appName}-consumer-group-id`,
          allowAutoTopicCreation: true,
        },
        producer: {
          idempotent: true,
          allowAutoTopicCreation: true,
        },
      },
    },
    {
      inheritAppConfig: true,
    },
  );

  await app.startAllMicroservices();
  await app.listen(port, () => {
    loggerService.log(`${appName} is running on port ${port}`);
  });
}

bootstrap();
