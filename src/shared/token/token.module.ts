import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LoggerService } from '@shared/logger/logger.service';

import { TokenService } from './token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: () => {
        return {
          signOptions: {
            algorithm: 'RS256' as const,
          },
        };
      },
    }),
  ],
  providers: [TokenService, LoggerService],
  exports: [TokenService],
})
export class TokenModule {}
