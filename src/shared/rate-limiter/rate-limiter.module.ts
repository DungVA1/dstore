import { RateLimitGuard } from '@apps/api-gateway/guards/rate-limit.guard';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short', // 3 requests within 1s
          limit: 3,
          ttl: 1000,
          blockDuration: 1000,
        },
        {
          name: 'medium',
          limit: 20,
          ttl: 10000, // 20 requests within 10s
          blockDuration: 5000,
        },
        {
          name: 'long',
          limit: 100, // 100 request within 60s
          ttl: 60000,
          blockDuration: 30000,
        },
      ],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
})
export class RateLimiterModule {}
