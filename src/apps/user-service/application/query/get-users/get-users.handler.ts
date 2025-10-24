import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IUserRepository } from '../../user-repository.interface';

import { GetUsersQuery } from './get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @Inject('IUserRepository') private readonly repo: IUserRepository,
  ) {}
  async execute(query: GetUsersQuery): Promise<any> {
    const users = await this.repo.getList({
      limit: query.limit,
      skip: (query.page - 1) * query.limit,
    });

    return users;
  }
}
