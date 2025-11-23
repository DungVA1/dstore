import { RpcExceptionFilter } from '@libs/error-handler/rpc-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { KafkaOptions, RpcException, Transport } from '@nestjs/microservices';
import { LoggerService } from '@shared/logger/logger.service';

import { AuthModule } from './auth.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  const loggerService = app.get(LoggerService);
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
  const port: number = configService.get<number>('app.auth.port')!;
  const appName: string = configService.get<string>('app.auth.name')!;
  loggerService.setContext(appName);
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
        },
        run: {
          partitionsConsumedConcurrently: 1,
        },
      },
    },
    { inheritAppConfig: true },
  );
  await app.startAllMicroservices();
  await app.listen(port, () => {
    loggerService.log(`${appName} API is running on port ${port}`);
  });
};

bootstrap();
