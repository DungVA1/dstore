import {
  Private,
  Public,
} from '@apps/api-gateway/decorators/public-api.decorator';
import { RateLimit } from '@apps/api-gateway/decorators/rate-limit.decorator';
import { LoginDTO } from '@common/dto/auth/login.dto';
import { RefreshTokenDTO } from '@common/dto/auth/refresh-token.dto';
import { RegisterDTO } from '@common/dto/auth/register.dto';
import { ResendOtpDTO } from '@common/dto/auth/resend-otp.dto';
import { VerifyTokenDTO } from '@common/dto/auth/verify-otp.dto';
import { Body, Controller, Headers, Post } from '@nestjs/common';

import { AuthMSService } from './auth-ms.service';

@Public()
@Controller('auth')
export class AuthMSController {
  constructor(private readonly authMSService: AuthMSService) {}

  @RateLimit({
    points: 1,
  })
  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.authMSService.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.authMSService.register(body);
  }

  @Post('resend-otp')
  resendOtp(@Body() body: ResendOtpDTO) {
    return this.authMSService.resendOtp(body);
  }

  @Post('verify-otp')
  verifyOtp(@Body() body: VerifyTokenDTO) {
    return this.authMSService.verifyOtp(body);
  }

  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokenDTO) {
    return this.authMSService.refreshToken(body);
  }

  @Private()
  @Post('logout')
  logout(@Headers('x-account-id') accountId: string) {
    return this.authMSService.logout({ accountId });
  }
}
