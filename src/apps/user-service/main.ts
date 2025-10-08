import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('User');

  const port: number = configService.get('app.user.port') as number;
  const appName = configService.get('app.user.name') as string;
  await app.listen(port, () => {
    logger.log(`${appName} is running on port ${port}`);
  });
}

bootstrap().catch((e) => console.log(e));
