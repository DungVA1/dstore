import { DomainError } from '@common/based.error';

import { INVALID_EMAIL, INVALID_ID } from '../common/account.error-node';

export class InvalidEmailError extends DomainError {
  constructor(email?: string) {
    const moreInfo = email ?? '';
    super(INVALID_EMAIL, `Invalid email ${moreInfo}`, { email });
  }
}

export class InvalidIdError extends DomainError {
  constructor(id?: string) {
    const moreInfo = id ?? '';
    super(INVALID_ID, `Invalid id ${moreInfo}`, { id });
  }
}
