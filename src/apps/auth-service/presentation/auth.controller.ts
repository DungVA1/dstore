import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { LoginCommand } from '../application/command/login/login.command';
import { RegisterCommand } from '../application/command/register/register.command';
import { ResendCodeCommand } from '../application/command/resend-code/resend-code.command';
import { VerifyTokenCommand } from '../application/command/verify/verify.command';

import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ResendOtpDTO } from './dto/resend-otp.dto';
import { VerifyTokenDTO } from './dto/verify-otp.dto';

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

  @Post('resend-otp')
  resendVerificationCode(@Body() body: ResendOtpDTO) {
    return this.commandBus.execute(new ResendCodeCommand(body.email));
  }

  @Post('verify-otp')
  verifyOtp(@Body() body: VerifyTokenDTO) {
    return this.commandBus.execute(
      new VerifyTokenCommand(body.email, body.token),
    );
  }
}
