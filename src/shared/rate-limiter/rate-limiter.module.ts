import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short',
          limit: 3,
          ttl: 1000,
          blockDuration: 1000,
        },
        {
          name: 'medium',
          limit: 20,
          ttl: 10000,
          blockDuration: 5000,
        },
        {
          name: 'long',
          limit: 100,
          ttl: 60000,
          blockDuration: 30000,
        },
      ],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class RateLimiterModule {}
