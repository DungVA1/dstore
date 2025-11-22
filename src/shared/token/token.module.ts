import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LoggerService } from '@shared/logger/logger.service';

import { TokenService } from './token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('secret.jwt'),
        };
      },
    }),
  ],
  providers: [TokenService, LoggerService],
  exports: [TokenService],
})
export class TokenModule {}
