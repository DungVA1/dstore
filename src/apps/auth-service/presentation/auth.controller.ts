import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { LoginCommand } from '../application/command/login/login.command';
import { RegisterCommand } from '../application/command/register/register.command';
import { ResendCodeCommand } from '../application/command/resend-code/resend-code.command';
import { VerifyTokenCommand } from '../application/command/verify/verify.command';

import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ResendOtpDTO } from './dto/resend-otp.dto';
import { VerifyTokenDTO } from './dto/verify-otp.dto';

@Controller()
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: 'auth.login' })
  login(@Payload() { email, password, remember }: LoginDTO) {
    return this.commandBus.execute(new LoginCommand(email, password, remember));
  }

  @Post('register')
  @MessagePattern({ cmd: 'auth.register' })
  register(@Payload() { email, password }: RegisterDTO) {
    return this.commandBus.execute(new RegisterCommand(email, password));
  }

  @Post('resend-otp')
  @MessagePattern({ cmd: 'auth.resendOTP' })
  resendVerificationCode(@Payload() { email }: ResendOtpDTO) {
    return this.commandBus.execute(new ResendCodeCommand(email));
  }

  @Post('verify-otp')
  @MessagePattern({ cmd: 'auth.verifyOTP' })
  verifyOtp(@Payload() { email, token }: VerifyTokenDTO) {
    return this.commandBus.execute(new VerifyTokenCommand(email, token));
  }
}
