import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
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
      always: true,
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const port: number = configService.get('app.user.port') as number;
  const msPort: number = configService.get('app.user.msPort') as number;
  const appName: string = configService.get('app.user.name') as string;
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: msPort,
    },
  });
  await app.startAllMicroservices();
  await app.listen(port, () => {
    logger.log(`${appName} is running on port ${port}`);
  });
  loggerService.log(`${appName} MicroService is running on port ${msPort}`);
};

bootstrap();
