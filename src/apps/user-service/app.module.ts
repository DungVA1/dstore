import { AppConfigModule } from '@libs/config/config.module';
import { Module } from '@nestjs/common';

import { UserController } from './presentation/user.controller';

@Module({
  imports: [AppConfigModule],
  controllers: [UserController],
})
export class AppModule {}
