import { BasedModel } from '@common/based.orm';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { AccountModel } from './account.model';

@Entity('refresh_token')
export class RefreshTokenModel extends BasedModel {
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  id: string;

  @Column({
    name: 'account_id',
    type: 'varchar',
    nullable: false,
  })
  accountId: string;

  @Column({
    name: 'token',
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  refreshToken: string;

  @Column({
    name: 'expired_at',
    type: 'timestamptz',
    nullable: false,
  })
  expiredAt: Date;

  @Column({
    name: 'used_at',
    type: 'timestamptz',
    nullable: true,
  })
  usedAt?: Date;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @ManyToOne(() => AccountModel, (account) => account.verificationTokens)
  @JoinColumn({ name: 'account_id' })
  account: AccountModel;
}
