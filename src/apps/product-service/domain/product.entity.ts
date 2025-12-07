import { BasedEntity } from '@common/based.entity';

import { ProductStatus } from '../common/product.enum';

import { ProductOutOfStockError } from './product.domain-error';
import { ProductId } from './product.object-values';

export class ProductEntity extends BasedEntity {
  private readonly _id: ProductId;
  private _name: string;
  private _quantity: number;
  private _status: ProductStatus;
  private readonly _ownerId: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(params: {
    id: ProductId;
    name: string;
    quantity: number;
    status: ProductStatus;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super();
    this._id = params.id;
    this._name = params.name;
    this._quantity = params.quantity;
    this._status = params.status;
    this._ownerId = params.ownerId;
    this._createdAt = params.createdAt;
    this._updatedAt = params.updatedAt;
  }

  static create(params: {
    id: string;
    name: string;
    quantity: number;
    ownerId: string;
  }) {
    const now = new Date();
    const product = new ProductEntity({
      id: ProductId.parse(params.id),
      name: params.name,
      quantity: params.quantity,
      status: ProductStatus.ACTIVE,
      ownerId: params.ownerId,
      createdAt: now,
      updatedAt: now,
    });

    return product;
  }

  incrQuantity(quantity: number) {
    this._quantity += quantity;
    this.touch();
  }

  descQuantity(quantity: number) {
    if (this._quantity < quantity) {
      return new ProductOutOfStockError();
    }

    this._quantity -= quantity;
    this.touch();
  }

  changeName(name: string) {
    this._name = name;
    this.touch();
  }

  inStock() {
    return this._quantity > 0;
  }

  markActive() {
    this._status = ProductStatus.ACTIVE;
    this.touch();
  }

  markInactive() {
    this._status = ProductStatus.INACTIVE;
    this.touch();
  }

  markDeteled() {
    this._status = ProductStatus.DELETED;
    this.touch();
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

  get status() {
    return this._status;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  static rehydrate(params: {
    id: string;
    name: string;
    quantity: number;
    status: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    const product = new ProductEntity({
      id: ProductId.parse(params.id),
      name: params.name,
      quantity: params.quantity,
      status: params.status as ProductStatus,
      ownerId: params.ownerId,
      createdAt: params.createdAt,
      updatedAt: params.updatedAt,
    });

    return product;
  }

  touch() {
    this._updatedAt = new Date();
  }
}
