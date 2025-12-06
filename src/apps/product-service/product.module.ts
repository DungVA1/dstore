import { Module } from '@nestjs/common';
import { AppConfigModule } from '@shared/config/config.module';
import { LoggerModule } from '@shared/logger/logger.module';

import { ProductController } from './presentation/product.controller';

@Module({
  imports: [AppConfigModule, LoggerModule],
  controllers: [ProductController],
})
export class ProductModule {}
