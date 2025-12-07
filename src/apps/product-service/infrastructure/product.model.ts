import { BasedModel } from '@common/based.orm';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductStatus } from '../common/product.enum';

@Entity('product')
export class ProductModel extends BasedModel {
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'quantity',
    type: 'int',
    default: 0,
  })
  quantity: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ProductStatus,
  })
  status: ProductStatus;

  @Column({
    name: 'owner_id',
    type: 'varchar',
    nullable: false,
  })
  ownerId: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
