import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { LoginCommand } from '../application/command/login/login.command';
import { LogoutCommand } from '../application/command/logout/logout.command';
import { RefreshTokenCommand } from '../application/command/refresh-token/refresh-token.command';
import { RegisterCommand } from '../application/command/register/register.command';
import { ResendCodeCommand } from '../application/command/resend-code/resend-code.command';
import { VerifyTokenCommand } from '../application/command/verify/verify.command';

import { LoginDTO } from './dto/login.dto';
import { LogoutDTO } from './dto/logout.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { RegisterDTO } from './dto/register.dto';
import { ResendOtpDTO } from './dto/resend-otp.dto';
import { VerifyTokenDTO } from './dto/verify-otp.dto';

@Controller()
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern('auth.login')
  login(@Payload() { email, password, remember }: LoginDTO) {
    return this.commandBus.execute(new LoginCommand(email, password, remember));
  }

  @MessagePattern('auth.register')
  register(@Payload() { email, password }: RegisterDTO) {
    return this.commandBus.execute(new RegisterCommand(email, password));
  }

  @MessagePattern('auth.resendOtp')
  resendVerificationCode(@Payload() { email }: ResendOtpDTO) {
    return this.commandBus.execute(new ResendCodeCommand(email));
  }

  @MessagePattern('auth.verifyOtp')
  verifyOtp(@Payload() { email, token }: VerifyTokenDTO) {
    return this.commandBus.execute(new VerifyTokenCommand(email, token));
  }

  @MessagePattern('auth.refreshToken')
  refreshToken(@Payload() { refreshToken }: RefreshTokenDTO) {
    return this.commandBus.execute(new RefreshTokenCommand(refreshToken));
  }

  @MessagePattern('auth.logout')
  logout(@Payload() { accountId, tokenId }: LogoutDTO) {
    return this.commandBus.execute(new LogoutCommand(accountId, tokenId));
  }
}
