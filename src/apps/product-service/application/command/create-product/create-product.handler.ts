import { ProductEntity } from '@apps/product-service/domain/product.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateProductCommand } from './create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  execute(command: CreateProductCommand): Promise<any> {
    const productEntity = ProductEntity.create({
      id: command.id,
      name: command.name,
      ownerId: command.ownerId,
      quantity: command.quantity,
    });

    return productEntity;
  }
}
