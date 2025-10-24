export abstract class BasedObjectValue {
  protected readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  protected abstract get isValid(): boolean;
  toString(): string {
    return this.value;
  }
}
