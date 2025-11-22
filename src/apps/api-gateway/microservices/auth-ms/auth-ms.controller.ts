import {
  Private,
  Public,
} from '@apps/api-gateway/decorators/public-api.decorator';
import { Body, Controller, Headers, Post } from '@nestjs/common';

import { AuthMSService } from './auth-ms.service';

@Public()
@Controller('auth')
export class AuthMSController {
  constructor(private readonly authMSService: AuthMSService) {}

  @Post('login')
  login(@Body() body) {
    return this.authMSService.login(body);
  }

  @Post('register')
  register(@Body() body) {
    return this.authMSService.register(body);
  }

  @Post('resend-otp')
  resendOtp(@Body() body) {
    return this.authMSService.resendOtp(body);
  }

  @Post('verify-otp')
  verifyOtp(@Body() body) {
    return this.authMSService.verifyOtp(body);
  }

  @Post('refresh-token')
  refreshToken(@Body() body) {
    return this.authMSService.refreshToken(body);
  }

  @Private()
  @Post('logout')
  logout(@Headers('x-account-id') accountId: string) {
    return this.authMSService.logout({
      accountId: accountId,
    });
  }
}
