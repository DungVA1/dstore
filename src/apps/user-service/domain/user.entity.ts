import { UserEmail, UserId } from './user.object-values';

type UserType = 'Admin' | 'User';

enum UserStatus {
  PENDING = 'Pending',
  ACTIVE = 'Active',
  BLOCKED = 'Blocked',
}

export class User {
  public id: UserId;
  public name: string;
  public email: UserEmail;
  private password: string;
  public type: UserType;
  public status: UserStatus;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    name: string,
    email: string,
    password: string,
    status: UserStatus,
    type: UserType,
  ) {
    this.name = name;
    this.email = new UserEmail(email);
    this.password = password;
    this.status = status;
    this.type = type;
  }

  static create(userDto: {
    name: string;
    email: string;
    password: string;
    status: UserStatus;
    type: UserType;
  }): User {
    const user = new User(
      userDto.name,
      userDto.email,
      userDto.password,
      UserStatus.PENDING,
      userDto.type,
    );

    user.createdAt = user.createdAt || new Date();
    user.updatedAt = user.updatedAt || new Date();

    return user;
  }

  markActive() {
    this.status = UserStatus.ACTIVE;
  }

  markBlocked() {
    this.status = UserStatus.BLOCKED;
  }

  changePassword(hashPassword: string) {
    this.password = hashPassword;
  }
}
