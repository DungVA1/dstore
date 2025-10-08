export class UserEmail {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  get(): string {
    return this.value;
  }
}

export class UserId {
  private value: string;

  get(): string {
    return this.value;
  }
}
