import {
  Private,
  Public,
} from '@apps/api-gateway/decorators/public-api.decorator';
import { RateLimit } from '@apps/api-gateway/decorators/rate-limit.decorator';
import { RateLimitGuard } from '@apps/api-gateway/guards/rate-limit.guard';
import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { Request } from 'express';

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

  @UseGuards(RateLimitGuard)
  @RateLimit({
    key: (req: Request) => (req.body as { email: string })?.email,
    points: 5,
  })
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
