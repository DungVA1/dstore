import { Module } from '@nestjs/common';
import { NotificationService } from '@shared/notification/notification.service';

import { LoggerService } from '../logger/logger.service';

@Module({
  providers: [NotificationService, LoggerService],
  exports: [NotificationService],
})
export class NotificationModule {}
