import { Public } from '@apps/api-gateway/decorators/public-api.decorator';
import { Body, Controller, Post } from '@nestjs/common';

import { AuthMSService } from './auth-ms.service';

@Public()
@Controller('auth')
export class AuthMSController {
  constructor(private readonly authMSService: AuthMSService) {}

  @Post('login')
  login(@Body() body) {
    return this.authMSService.login(body);
  }
}
