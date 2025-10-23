// this file to store all error definition for application errors
import { ApplicationError } from '@common/based.error';
import { HttpStatus } from '@nestjs/common';

import { USER_NOT_FOUND } from '../common/user.error-code';

export class UserApplicationError extends ApplicationError {}
export class UserNotFoundError extends UserApplicationError {
  constructor(id?: string) {
    super(USER_NOT_FOUND, 'User not found', HttpStatus.NOT_FOUND, {
      id,
    });
  }
}
