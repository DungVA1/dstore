import { Controller, Get, Query } from '@nestjs/common';

import { UserMSService } from './user-ms.service';

@Controller('users')
export class UserMSController {
  constructor(private readonly userMSService: UserMSService) {}

  @Get()
  getUsers(@Query() query) {
    return this.userMSService.getUsers(query);
  }
}
