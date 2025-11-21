import { RpcExceptionFilter } from '@libs/error-handler/rpc-exception.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { LoggerService } from '@shared/logger/logger.service';

import { UserAppModule } from './user.module';
const logger = new Logger('User');

const bootstrap = async () => {
  const app = await NestFactory.create(UserAppModule);
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
          code: 400,
          error: {
            code: 'VALIDATION_ERROR',
            message: msgs.join(', '),
          },
        });
      },
    }),
  );
  app.useGlobalFilters(new RpcExceptionFilter());
  const port: number = configService.get('app.user.port') as number;
  const msPort: number = configService.get('app.user.msPort') as number;
  const appName: string = configService.get('app.user.name') as string;
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        port: msPort,
      },
    },
    {
      inheritAppConfig: true,
    },
  );
  await app.startAllMicroservices();
  await app.listen(port, () => {
    logger.log(`${appName} is running on port ${port}`);
  });
  loggerService.log(`${appName} MicroService is running on port ${msPort}`);
};

bootstrap();
