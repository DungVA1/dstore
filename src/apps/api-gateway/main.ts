import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { LoggerService } from '@shared/logger/logger.service';

import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);
  const loggerService = app.get(LoggerService);
  app.useLogger(loggerService);
  app.setGlobalPrefix('api');
  const port: number = configService.get('app.gateway.port') as number;
  const appName: string = configService.get('app.gateway.name') as string;
  loggerService.setContext(appName);
  await app.listen(port, () => {
    loggerService.log(`${appName} is running on port ${port}`);
  });
}

bootstrap();
