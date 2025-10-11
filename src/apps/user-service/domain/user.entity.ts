import { BasedEntity } from '@common/based.entity';

import { UserStatus } from '../common/user.enum';
import { UserType } from '../common/user.type';

import { EmailAddress, UserId } from './user.object-values';

export class UserEntity extends BasedEntity {
  private _id?: UserId;
  private _name: string;
  private _email: EmailAddress;
  private _password: string;
  private _phone?: string;
  private _type: UserType;
  private _status: UserStatus;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(params: {
    id?: UserId;
    name: string;
    email: EmailAddress;
    password: string;
    phone?: string;
    status: UserStatus;
    type: UserType;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super();

    this._id = params.id;
    this._name = params.name;
    this._email = params.email;
    this._password = params.password;
    this._phone = params.phone;
    this._status = params.status;
    this._type = params.type;
    this._createdAt = params.createdAt;
    this._updatedAt = params.updatedAt;
  }

  static create(params: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    status: UserStatus;
    type: UserType;
  }): UserEntity {
    const now = new Date();
    const emailAddress = new EmailAddress(params.email);
    if (!emailAddress.isValid()) {
      throw new Error('Email address is not valid');
    }
    const user = new UserEntity({
      name: params.name,
      email: emailAddress,
      password: params.password,
      phone: params.phone,
      status: UserStatus.PENDING,
      type: params.type,
      createdAt: now,
      updatedAt: now,
    });

    return user;
  }

  markActive() {
    this._status = UserStatus.ACTIVE;
    this.touch();
  }

  markBlocked() {
    this._status = UserStatus.BLOCKED;
    this.touch();
  }

  changePassword(hashPassword: string) {
    this._password = hashPassword;
    this.touch();
  }

  rename(name: string) {
    this._name = name;
    this.touch();
  }

  changePhoneNumber(phone: string) {
    this._phone = phone;
    this.touch();
  }

  // internal use
  private touch() {
    this._updatedAt = new Date();
  }

  // use for mapper
  static rehydrate(params: {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    type: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return new UserEntity({
      id: new UserId(params.id),
      name: params.name,
      email: new EmailAddress(params.email),
      password: params.password,
      phone: params.phone,
      type: params.type as UserType,
      status: params.status as UserStatus,
      createdAt: params.createdAt,
      updatedAt: params.updatedAt,
    });
  }

  // #region: get fnc
  get id() {
    return this._id?.getValue();
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email.getValue();
  }

  get password(): string {
    return this._password;
  }

  get phone(): string | undefined {
    return this._phone;
  }

  get type(): UserType {
    return this._type;
  }

  get status(): UserStatus {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // #endregion: get fnc
}
