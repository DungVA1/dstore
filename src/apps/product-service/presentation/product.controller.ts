import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProductController {
  @MessagePattern('product.create')
  createProduct() {}

  @MessagePattern('product.update')
  updateProduct() {}

  @MessagePattern('product.delete')
  deleteProduct() {}

  @MessagePattern('product.list')
  getProducts() {}

  @MessagePattern('product.detail')
  getProduct() {}
}
