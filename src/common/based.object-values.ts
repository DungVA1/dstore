export abstract class BasedObjectValue {
  protected readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  abstract isValid(): boolean;
}
