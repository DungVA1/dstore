import { err, ok, Result } from '@common/based.error';
import { BasedObjectValue } from '@common/based.object-values';

import { InvalidEmailError } from './account.domain-error';
export class EmailAddress extends BasedObjectValue {
  private readonly emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  private constructor(value: string) {
    super(value);
  }

  get isValid(): boolean {
    return this.emailPattern.test(this.value);
  }

  static create(value: string): Result<EmailAddress, InvalidEmailError> {
    const email = new EmailAddress(value.trim().toLowerCase());
    return email.isValid
      ? ok(email)
      : err(new InvalidEmailError(email.toString()));
  }

  static parse(value: string) {
    return new EmailAddress(value);
  }
}

export class AccountId extends BasedObjectValue {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): AccountId {
    const id = new AccountId(value.trim().toLowerCase());
    return id;
  }
}
