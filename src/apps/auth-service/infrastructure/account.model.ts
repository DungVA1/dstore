import { BasedModel } from '@common/based.orm';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AccountStatus } from '../common/account.enum';

@Entity('accounts')
export class AccountModel extends BasedModel {
  @PrimaryColumn()
  id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 30,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password: string;

  @Column({
    name: 'role',
    type: 'varchar',
    default: 'User',
  })
  role: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.PENDING,
  })
  status: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
