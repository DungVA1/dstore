import { SuccessResponse } from '@common/based.response';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateUserCommand } from '../application/command/create-user/create-user.command';
import { DeleteUserCommand } from '../application/command/delete-user/delete-user.command';
import { UpdateUserCommand } from '../application/command/update-user/update-user.command';
import { GetUsersQuery } from '../application/query';
import { GetUserQuery } from '../application/query/get-user/get-user.query';
import { UserEntity } from '../domain/user.entity';

import { CreateUserDTO } from './dto/create-user.dto';
import { GetListUserQueryDTO } from './dto/get-list-users.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async getList(@Query() query: GetListUserQueryDTO) {
    const users: UserEntity[] = await this.queryBus.execute(
      new GetUsersQuery(query.limit, query.page, query.sort, query.search),
    );

    return new SuccessResponse(users);
  }

  @Get(':id')
  getDetail(id: string) {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDTO) {
    await this.commandBus.execute(
      new CreateUserCommand(
        Math.random().toString(),
        createUserDto.email,
        createUserDto.password,
        createUserDto.name,
        createUserDto.phone,
      ),
    );
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    await this.commandBus.execute(
      new UpdateUserCommand(
        id,
        updateUserDTO.email,
        updateUserDTO.password,
        updateUserDTO.name,
        updateUserDTO.phone,
      ),
    );
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteUserCommand(id));
  }
}
