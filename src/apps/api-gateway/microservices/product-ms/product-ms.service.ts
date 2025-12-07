import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

export class ProductMSService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientKafka,
  ) {}

  protected async onModuleInit() {
    this.productClient.subscribeToResponseOf('product.create');
    await this.productClient.connect();
  }

  createProduct(product) {
    this.productClient.send('product.create', product);
  }
}
