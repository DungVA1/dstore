import { ApplicationError } from '@common/based.error';

class AccountApplicationError extends ApplicationError {
  constructor(code: string, message: string) {
    super(code, message);
  }
}

export class EmailAlreadExistedError extends AccountApplicationError {
  httpStatus = 400;
  constructor() {
    super('EMAIL_IS_ALREAD_USED', 'email is alread existed');
  }
}
