import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { LoginCommand } from '../application/command/login/login.command';
import { RegisterCommand } from '../application/command/register/register.command';

import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.commandBus.execute(
      new LoginCommand(body.email, body.password, body.remember),
    );
  }

  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.commandBus.execute(
      new RegisterCommand(body.email, body.password),
    );
  }
}
