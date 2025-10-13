import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IUserRepository } from '../../user-repository.interface';

import { GetUserQuery } from './query';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @Inject('IUserRepository') private readonly userRepo: IUserRepository,
  ) {}
  async execute(query: GetUserQuery): Promise<any> {
    const user = await this.userRepo.getById(query.id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
