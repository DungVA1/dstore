import { UserModel } from '../infrastructure/user.model';

export interface IUserRepository {
  save(userModel: UserModel): Promise<UserModel>;
  getById(id: string): Promise<UserModel | null>;
  getList(options): Promise<UserModel[]>;
  delete(id: string): Promise<void>;
  update(id: string, userModel: UserModel): Promise<UserModel>;
}
