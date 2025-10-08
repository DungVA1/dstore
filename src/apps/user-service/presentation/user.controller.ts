import { Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserCreateDTO } from './dto/user-create.dto';

@Controller('users')
export class UserController {
  constructor(private readonly configService: ConfigService) {}
  users: UserCreateDTO[] = [];
  @Get()
  getList(): UserCreateDTO[] {
    return this.users;
  }

  @Post()
  createUser(userDto: UserCreateDTO) {
    this.users.push(userDto);
  }
}
