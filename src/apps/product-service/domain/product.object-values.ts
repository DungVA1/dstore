import { BasedObjectValue } from '@common/based.object-values';

export class ProductId extends BasedObjectValue {
  private constructor(value: string) {
    super(value);
  }

  static parse(value: string) {
    return new ProductId(value);
  }
}
