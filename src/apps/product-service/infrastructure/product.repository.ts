import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IProductRepository } from '../application/product-repository.interface';
import { ProductStatus } from '../common/product.enum';

import { ProductModel } from './product.model';

export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private readonly repo: Repository<ProductModel>,
  ) {}

  create(product: ProductModel): Promise<ProductModel> {
    return this.repo.save(product);
  }
  async update(product: ProductModel): Promise<ProductModel> {
    await this.repo.update(product.id, product);

    return product;
  }

  async delete(id: string): Promise<boolean> {
    await this.repo.update(id, { status: ProductStatus.DELETED });

    return true;
  }
  getOne(id: string): Promise<ProductModel | null> {
    return this.repo.findOne({ where: { id } });
  }
  getList(): Promise<ProductModel[]> {
    return this.repo.find();
  }
}
