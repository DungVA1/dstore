import { ProductModel } from '../infrastructure/product.model';

export interface IProductRepository {
  create(product: ProductModel): Promise<ProductModel>;
  update(product: ProductModel): Promise<ProductModel>;
  delete(id: string): Promise<boolean>;
  getOne(id: string): Promise<ProductModel | null>;
  getList(): Promise<ProductModel[]>;
}
