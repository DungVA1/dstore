import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUserRepository } from '../application/user-repository.interface';

import { UserModel } from './user.model';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepo: Repository<UserModel>,
  ) {}

  async save(userModel: UserModel): Promise<UserModel> {
    await this.userRepo.save(userModel);

    return userModel;
  }

  async update(id: string, userModel: UserModel): Promise<UserModel> {
    await this.userRepo.update({ id }, userModel);

    return userModel;
  }

  async getById(id: string): Promise<UserModel | null> {
    const user = await this.userRepo.findOneBy({ id });

    return user;
  }
  async getList(options: {
    limit?: number;
    skip?: number;
  }): Promise<UserModel[]> {
    const users = await this.userRepo.find({
      skip: options.skip,
      take: options.limit,
    });

    return users;
  }
  async delete(id: string): Promise<void> {
    await this.userRepo.delete({ id });
  }
}
