import { NotificationService } from '@libs/shared/notification/notification.service';
import { Module } from '@nestjs/common';

import { LoggerService } from '../logger/logger.service';

@Module({
  providers: [NotificationService, LoggerService],
  exports: [NotificationService],
})
export class NotificationModule {}
