import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetUserQuery } from '../application/query/get-user/get-user.query';

@Controller('users')
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get(':id')
  getDetail(id: string) {
    return this.queryBus.execute(new GetUserQuery(id));
  }
}
