import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@shared/config/config.module';
import { DatabaseModule } from '@shared/database/database.module';
import { LoggerModule } from '@shared/logger/logger.module';

import { CreateProductHandler } from './application/command/create-product/create-product.handler';
import { ProductModel } from './infrastructure/product.model';
import { ProductRepository } from './infrastructure/product.repository';
import { ProductController } from './presentation/product.controller';

@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    TypeOrmModule.forFeature([ProductModel]),
    AppConfigModule,
    LoggerModule,
  ],
  controllers: [ProductController],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
    CreateProductHandler,
  ],
})
export class ProductModule {}
