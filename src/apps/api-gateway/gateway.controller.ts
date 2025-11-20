import { Controller, Get, Post } from '@nestjs/common';

import { Public } from './decorators/public-api.decorator';

@Controller('users')
export class UserController {
  @Get()
  getUser() {
    return {
      status: 200,
    };
  }
}

@Public()
@Controller('auth')
export class AuthController {
  @Post('login')
  login() {
    return {
      status: 200,
    };
  }
}
