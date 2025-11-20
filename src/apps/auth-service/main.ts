import { AllExceptionsFilter } from '@libs/error-handler/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
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
      always: true,
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  const port: number = configService.get('app.auth.port') as number;
  const msPort: number = configService.get('app.auth.msPort') as number;
  const appName: string = configService.get('app.auth.name') as string;
  loggerService.setContext(appName);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: msPort },
  });
  await app.startAllMicroservices();
  await app.listen(port, () => {
    loggerService.log(`${appName} API is running on port ${port}`);
  });
  loggerService.log(`${appName} MicroService is running on port ${msPort}`);
};

bootstrap();
