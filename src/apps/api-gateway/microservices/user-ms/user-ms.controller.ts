import { Controller, Get } from '@nestjs/common';

import { UserMSService } from './user-ms.service';

@Controller('users')
export class UserMSController {
  constructor(private readonly userMSService: UserMSService) {}

  @Get()
  getUsers() {
    return this.userMSService.getUsers({ limit: 'aa' });
  }
}
