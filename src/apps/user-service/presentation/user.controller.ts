import { SuccessResponse } from '@common/based.response';
import { Body, Controller, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateUserCommand } from '../application/command/create-user/create-user.command';
import { DeleteUserCommand } from '../application/command/delete-user/delete-user.command';
import { UpdateUserCommand } from '../application/command/update-user/update-user.command';
import { GetUsersQuery } from '../application/query';
import { GetUserQuery } from '../application/query/get-user/get-user.query';
import { UserEntity } from '../domain/user.entity';

import { CreateUserDTO } from './dto/create-user.dto';
import { GetListUserQueryDTO } from './dto/get-list-users.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @MessagePattern('user.getAll')
  async getList(@Payload() query: GetListUserQueryDTO) {
    const users: UserEntity[] = await this.queryBus.execute(
      new GetUsersQuery(query.limit, query.page, query.sort, query.search),
    );

    return new SuccessResponse(users);
  }

  @MessagePattern('user.getOne')
  getDetail(@Param('id') id: string) {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @MessagePattern('user.create')
  async createUser(@Body() createUserDto: CreateUserDTO) {
    await this.commandBus.execute(
      new CreateUserCommand(
        Math.random().toString(),
        createUserDto.identityId,
        createUserDto.email,
        createUserDto.name,
        createUserDto.phone,
      ),
    );
  }

  @MessagePattern('user.update')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    await this.commandBus.execute(
      new UpdateUserCommand(
        id,
        updateUserDTO.email,
        updateUserDTO.name,
        updateUserDTO.phone,
      ),
    );
  }

  @MessagePattern('user.delete')
  async deleteUser(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteUserCommand(id));
  }
}
