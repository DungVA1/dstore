import { Body, Controller, Get, Post } from '@nestjs/common';

import { Public } from './decorators/public-api.decorator';
import { GatewayService } from './gateway.service';

@Controller('users')
export class UserController {
  constructor(private readonly gatewayService: GatewayService) {}
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
  constructor(private readonly gatewayService: GatewayService) {}
  @Post('login')
  login(@Body() body) {
    return this.gatewayService.login(body);
  }
}
