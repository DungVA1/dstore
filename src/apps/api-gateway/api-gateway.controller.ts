import { Controller, Get } from '@nestjs/common';

@Controller()
export class ApiGatewayController {
  @Get('users')
  getUser() {
    return {
      status: 200,
    };
  }
}
