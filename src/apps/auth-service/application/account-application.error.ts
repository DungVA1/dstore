import { ApplicationError } from '@common/based.error';
import { HttpStatus } from '@nestjs/common';

class AccountApplicationError extends ApplicationError {
  constructor(code: string, message: string, httpStatus: number) {
    super(code, message, httpStatus);
  }
}
export class EmailAlreadyUsedError extends AccountApplicationError {
  constructor() {
    super(
      'EMAIL_IS_ALREADY_USED',
      'email is already used',
      HttpStatus.BAD_REQUEST,
    );
  }
}
export class EmailNotExistedError extends AccountApplicationError {
  constructor() {
    super('EMAIL_IS_NOT_EXISTED', 'email is not existed', HttpStatus.NOT_FOUND);
  }
}
export class EmailOrPasswordIsWrongError extends AccountApplicationError {
  constructor() {
    super(
      'EMAIL_OR_PASSWORD_IS_WRONG',
      'email or password is wrong',
      HttpStatus.BAD_REQUEST,
    );
  }
}
export class AccountIsNotActivedError extends AccountApplicationError {
  constructor() {
    super(
      'ACCOUNT_IS_NOT_ACTIVE',
      'account is not active',
      HttpStatus.BAD_REQUEST,
    );
  }
}
export class AccountAlreadyActivedError extends AccountApplicationError {
  constructor() {
    super(
      'ACCOUNT_IS_ALREADY_ACTIVED',
      'account is already actived',
      HttpStatus.BAD_REQUEST,
    );
  }
}
export class AccountIsLockedError extends AccountApplicationError {
  constructor() {
    super('ACCOUNT_IS_LOCKED', 'account is locked', HttpStatus.BAD_REQUEST);
  }
}
export class AccountIsAlreadyLockedError extends AccountApplicationError {
  constructor() {
    super(
      'ACCOUNT_IS_ALREADY_LOCKED',
      'account is already locked',
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class AccountIsNotRegistered extends AccountApplicationError {
  constructor() {
    super(
      'ACCOUNT_IS_NOT_REGISTED',
      'account is not registered',
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class VerificationTokenIsWrongOrExpired extends AccountApplicationError {
  constructor() {
    super(
      'VERIFICATION_IS_WRONG_OR_EXPIRED',
      'token is not wrong or expired',
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class RefreshTokenIsInvalid extends AccountApplicationError {
  constructor() {
    super(
      'REFRESH_TOKEN_IS_INVALID',
      'refreshToken is invalid',
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class RateLimitExceeded extends AccountApplicationError {
  constructor() {
    super(
      'RATE_LIMIT_EXCEEDED',
      'Rate limit exceeded. Please try again',
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
