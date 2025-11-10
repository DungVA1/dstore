import { ApplicationError } from '@common/based.error';

class AccountApplicationError extends ApplicationError {
  constructor(code: string, message: string) {
    super(code, message);
  }
}

export class EmailAlreadExistedError extends AccountApplicationError {
  httpStatus = 400;
  constructor() {
    super('EMAIL_IS_ALREAD_USED', 'email is already existed');
  }
}

export class EmailNotExistedError extends AccountApplicationError {
  httpStatus = 404;
  constructor() {
    super('EMAIL_IS_NOT_EXISTED', 'email is not existed');
  }
}

export class EmailOrPasswordIsWrongError extends AccountApplicationError {
  httpStatus = 400;
  constructor() {
    super('EMAIL_OR_PASSWORD_IS_WRONG', 'email or password is wrong');
  }
}

export class AccountIsNotActivedError extends AccountApplicationError {
  httpStatus = 400;
  constructor() {
    super('ACCOUNT_IS_NOT_ACTIVE', 'account is not active');
  }
}
