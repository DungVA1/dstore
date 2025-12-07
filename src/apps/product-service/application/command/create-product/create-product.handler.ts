import { ProductEntity } from '@apps/product-service/domain/product.entity';
import { ProductMapper } from '@apps/product-service/infrastructure/product.mapper';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IProductRepository } from '../../product-repository.interface';

import { CreateProductCommand } from './create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject('IProductRepository') private readonly repo: IProductRepository,
  ) {}

  async execute(command: CreateProductCommand): Promise<any> {
    const productEntity = ProductEntity.create({
      id: command.id,
      name: command.name,
      ownerId: command.ownerId,
      quantity: command.quantity,
    });

    const mapper = new ProductMapper();
    const product = mapper.toModel(productEntity);
    await this.repo.create(product);

    return productEntity;
  }
}
