import { Module } from '@nestjs/common';
import { AppConfigModule } from '@shared/config/config.module';
import { LoggerService } from '@shared/logger/logger.service';

import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';

@Module({
  imports: [AppConfigModule],
  providers: [ApiGatewayService, LoggerService],
  controllers: [ApiGatewayController],
})
export class ApiGatewayModule {}
