import { BasedObjectValue } from '@common/based.object-values';

export class EmailAddress extends BasedObjectValue {
  private readonly emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  constructor(value: string) {
    super(value.trim().toLowerCase());
  }

  isValid(): boolean {
    return this.emailRegex.test(this.value);
  }
}

export class UserId extends BasedObjectValue {
  constructor(value: string) {
    super(value.trim().toLowerCase());
  }

  isValid(): boolean {
    return this.value.length > 0 && this.value.length < 20;
  }
}
