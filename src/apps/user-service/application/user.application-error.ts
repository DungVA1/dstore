import { ApplicationError } from '@common/based.error';
import { HttpStatus } from '@nestjs/common';

import { USER_NOT_FOUND } from '../common/user.error';

export class UserApplicationError extends ApplicationError {}

export class UserNotFoundError extends UserApplicationError {
  constructor(id?: string) {
    super(USER_NOT_FOUND, 'User not found', HttpStatus.NOT_FOUND, {
      id,
    });
  }
}
