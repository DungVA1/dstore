import { BasedEntity } from '@common/based.entity';

import { ProductId } from './product.object-values';

export class ProductEntity extends BasedEntity {
  private readonly _id: ProductId;
  private _name: string;
  private _quantity: number;
  private readonly _ownerId: string;
  private readonly _createdAt: Date;

  constructor(params: {
    id: ProductId;
    name: string;
    quantity: number;
    ownerId: string;
    createdAt: Date;
  }) {
    super();
    this._id = params.id;
    this._name = params.name;
    this._quantity = params.quantity;
    this._ownerId = params.ownerId;
    this._createdAt = params.createdAt;
  }

  static create(params: {
    id: string;
    name: string;
    quantity: number;
    ownerId: string;
  }) {
    const product = new ProductEntity({
      id: ProductId.parse(params.id),
      name: params.name,
      quantity: params.quantity,
      ownerId: params.ownerId,
      createdAt: new Date(),
    });

    return product;
  }

  incrQuantity(quantity: number) {
    this._quantity += quantity;
  }

  descQuantity(quantity: number) {
    if (this._quantity < quantity) {
      return new Error('Stock is not enough');
    }

    this._quantity -= quantity;
  }

  changeName(name: string) {
    this._name = name;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get quantity() {
    return this._quantity;
  }

  get ownerId() {
    return this._ownerId;
  }

  get createdAt() {
    return this._createdAt;
  }
}
