import { DomainError, err, ok, Result } from '@common/based.error';
import { BasedObjectValue } from '@common/based.object-values';

class InvalidEmailError extends DomainError {
  constructor(email?: string) {
    const moreInfo = email ?? '';
    super('INVALID_EMAIL', `Invalid email ${moreInfo}`, 400);
  }
}

class InvalidIdError extends DomainError {
  constructor(id?: string) {
    const moreInfo = id ?? '';
    super('INVALID_ID', `Invalid id ${moreInfo}`, 400);
  }
}

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

export class UserId extends BasedObjectValue {
  private constructor(value: string) {
    super(value);
  }

  get isValid() {
    return this.value.length > 0 && this.value.length <= 20;
  }

  static create(value: string): Result<UserId, InvalidIdError> {
    const id = new UserId(value.trim().toLowerCase());

    return id.isValid ? ok(id) : err(new InvalidEmailError(id.toString()));
  }

  static parse(value: string) {
    return new UserId(value);
  }
}
