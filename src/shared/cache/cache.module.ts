import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';

import { CacheService } from './cache.service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'single',
          options: {
            host: configService.get<string>('redis.host'),
            port: configService.get<number>('redis.port'),
            password: configService.get<string>('redis.password'),
          },
        };
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
