import { AppConfigModule } from '@libs/config/config.module';
import { LoggerService } from '@libs/log/logger.service';
import { Module } from '@nestjs/common';

import { UserController } from './presentation/user.controller';

@Module({
  imports: [AppConfigModule],
  controllers: [UserController],
  providers: [LoggerService],
})
export class AppModule {}
