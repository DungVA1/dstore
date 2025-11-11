import { ApplicationError } from '@common/based.error';

class AccountApplicationError extends ApplicationError {
  constructor(code: string, message: string) {
    super(code, message);
  }
}
export class EmailAlreadyUsedError extends AccountApplicationError {
  httpStatus = 400;
  constructor() {
    super('EMAIL_IS_ALREADY_USED', 'email is already used');
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
export class AccountAlreadyActivedError extends AccountApplicationError {
  httpStatus = 400;
  constructor() {
    super('ACCOUNT_IS_ALREADY_ACTIVED', 'account is already actived');
  }
}
export class AccountIsLockedError extends AccountApplicationError {
  httpStatus = 400;
  constructor() {
    super('ACCOUNT_IS_LOCKED', 'account is locked');
  }
}
export class AccountIsAlreadyLockedError extends AccountApplicationError {
  httpStatus = 400;
  constructor() {
    super('ACCOUNT_IS_ALREADY_LOCKED', 'account is already locked');
  }
}

export class AccountIsNotRegistered extends AccountApplicationError {
  httpStatus = 400;
  constructor() {
    super('ACCOUNT_IS_NOT_REGISTED', 'account is not registered');
  }
}

export class VerificationTokenIsWroingOrExpired extends AccountApplicationError {
  httpStatus = 400;
  constructor() {
    super('VERIFICATION_IS_WRONG_OR_EXPIRED', 'token is not wrong or expired');
  }
}
