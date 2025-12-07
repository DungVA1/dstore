import { Body, Controller, Post } from '@nestjs/common';

import { ProductMSService } from './product-ms.service';

@Controller('products')
export class ProductMSController {
  constructor(private readonly productMSService: ProductMSService) {}
  @Post()
  createProduct(@Body() body) {
    return this.productMSService.createProduct(body);
  }
}
