import { BasedEntity } from '@common/based.entity';

import { AccountStatus } from '../common/account.enum';
import { Role } from '../common/account.type';
import { VerificationToken } from '../common/verification-token.type';

import { AccountId } from './account.object-values';

export class AccountEntity extends BasedEntity {
  private _id: AccountId;
  private _email: string;
  private _password: string;
  private _status: AccountStatus;
  private _role: Role;
  private _verificationTokens: VerificationToken[];
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(params: {
    id: AccountId;
    email: string;
    password: string;
    status: AccountStatus;
    role: Role;
    verificationTokens: VerificationToken[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    super();
    this._id = params.id;
    this._email = params.email;
    this._password = params.password;
    this._status = params.status;
    this._role = params.role;
    this._verificationTokens = params.verificationTokens;
    this._createdAt = params.createdAt;
    this._updatedAt = params.updatedAt;
  }

  static create(params: {
    email: string;
    password: string;
    verificationTokens?: VerificationToken[];
  }) {
    const now = new Date();
    const account = new AccountEntity({
      id: AccountId.generate(),
      email: params.email,
      password: params.password,
      status: AccountStatus.PENDING,
      role: 'User',
      verificationTokens: params.verificationTokens || [],
      createdAt: now,
      updatedAt: now,
    });

    return account;
  }

  changePassword(password: string) {
    this._password = password;
    this.touch();
  }

  active() {
    if (this._status === AccountStatus.DELETED) {
      return {
        ok: false,
        error: new Error('CAN_NOT_ACTIVE_A_DELETED_ACCOUNT'),
      };
    }
    this._status = AccountStatus.PENDING;
    this.touch();
  }

  lock() {
    if (this._status === AccountStatus.LOCKED) {
      return {
        ok: false,
        error: new Error('ACCOUNT_ALREADY_LOCKED'),
      };
    }
    this._status = AccountStatus.LOCKED;
    this.touch();
  }

  delete() {
    if (this._status === AccountStatus.DELETED) {
      return {
        ok: false,
        error: new Error('ACCOUNT_ALREADY_DELETED'),
      };
    }
    this._status = AccountStatus.DELETED;
    this.touch();
  }

  touch() {
    this._updatedAt = new Date();
  }

  static rehydrate(params: {
    id: string;
    email: string;
    password: string;
    status: string;
    role: string;
    verificationTokens: VerificationToken[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    return new AccountEntity({
      id: AccountId.parse(params.id),
      email: params.email,
      password: params.password,
      status: params.status as AccountStatus,
      role: params.role as Role,
      verificationTokens: params.verificationTokens,
      createdAt: params.createdAt,
      updatedAt: params.updatedAt,
    });
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get status() {
    return this._status;
  }

  get role() {
    return this._role;
  }

  get verificationTokens() {
    return this._verificationTokens;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}
