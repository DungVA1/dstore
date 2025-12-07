import { DomainError } from '@common/based.error';

import { PRODUCT_OUT_OF_STOCK } from '../common/product.error-code';

export class ProductOutOfStockError extends DomainError {
  constructor() {
    super(PRODUCT_OUT_OF_STOCK, 'product out of stock');
  }
}
