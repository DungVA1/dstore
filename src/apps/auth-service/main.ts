import { AllExceptionsFilter } from '@libs/error-handler/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { LoggerService } from '@shared/logger/logger.service';

import { AuthModule } from './auth.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  const loggerService = app.get(LoggerService);
  app.useLogger(loggerService);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const port: number = configService.get('app.auth.port') as number;
  const appName: string = configService.get('app.auth.name') as string;
  loggerService.setContext(appName);
  await app.listen(port, () => {
    loggerService.log(`${appName} is running on port ${port}`);
  });
};

bootstrap();
