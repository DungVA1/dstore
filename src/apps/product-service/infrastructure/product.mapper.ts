import { IMapper } from '@common/based.mapper';

import { ProductEntity } from '../domain/product.entity';

import { ProductModel } from './product.model';

export class ProductMapper implements IMapper {
  toEntity(model: ProductModel): ProductEntity {
    const productEntity = ProductEntity.rehydrate({
      id: model.id,
      name: model.name,
      quantity: model.quantity,
      status: model.status,
      ownerId: model.ownerId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });

    return productEntity;
  }
  toModel(entity: ProductEntity): ProductModel {
    const productModel = new ProductModel();
    productModel.id = entity.id.toString();
    productModel.name = entity.name;
    productModel.status = entity.status;
    productModel.ownerId = entity.ownerId;
    productModel.quantity = entity.quantity;
    productModel.createdAt = entity.createdAt;
    productModel.updatedAt = entity.updatedAt;

    return productModel;
  }
}
