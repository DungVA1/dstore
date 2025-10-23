import { LoggerService } from '@libs/log/logger.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

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
  const appName: string = configService.get('app.user.name') as string;
  await app.listen(port, () => {
    logger.log(`${appName} is running on port ${port}`);
  });
};

bootstrap();
