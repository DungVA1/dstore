import { BasedModel } from '@common/based.orm';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserStatus } from '../common/user.enum';

@Entity('users')
export class UserModel extends BasedModel {
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    unique: true,
    primary: true,
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
    name: 'email',
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 30,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    nullable: true,
  })
  phone: string;

  @Column({
    name: 'type',
    type: 'varchar',
    nullable: false,
    default: 'User',
  })
  type: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: UserStatus,
    nullable: false,
    default: UserStatus.PENDING,
  })
  status: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    nullable: false,
  })
  updatedAt: Date;
}
