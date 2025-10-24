import { err, ok, Result } from '@common/based.error';
import { BasedObjectValue } from '@common/based.object-values';

import { InvalidEmailError, InvalidIdError } from './account.domain-error';
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

  protected get isValid() {
    return this.value.length > 0 && this.value.length <= 20;
  }

  static generate() {
    return new AccountId(Math.random().toString());
  }

  static create(value: string): Result<AccountId, InvalidIdError> {
    const id = new AccountId(value.trim().toLowerCase());

    return id.isValid ? ok(id) : err(new InvalidEmailError(id.toString()));
  }

  static parse(value: string) {
    return new AccountId(value);
  }
}
