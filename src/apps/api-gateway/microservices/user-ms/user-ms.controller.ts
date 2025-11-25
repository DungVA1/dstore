import { GetListUserQueryDTO } from '@common/dto/user/get-list-users.dto';
import { Controller, Get, Query } from '@nestjs/common';

import { UserMSService } from './user-ms.service';

@Controller('users')
export class UserMSController {
  constructor(private readonly userMSService: UserMSService) {}

  @Get()
  getUsers(@Query() query: GetListUserQueryDTO) {
    return this.userMSService.getUsers(query);
  }
}
