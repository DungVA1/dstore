/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import type { Redis } from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

@Injectable()
export class RateLimitService {
  private rateLimiter: RateLimiterRedis;
  constructor(@InjectRedis() private readonly redis: Redis) {
    this.rateLimiter = new RateLimiterRedis({
      storeClient: this.redis,
      keyPrefix: 'rate-limit',
      points: 5, // in each period, rate limiter give 5 point and consume by number of point in consume function
      duration: 60, // 60 seconds
      blockDuration: 60,
    });
  }

  async consume(key: string, points?: number) {
    try {
      // number of point will consume, if total - consumer > 0 then return true, else falsee
      await this.rateLimiter.consume(key, points);
      return true;
    } catch {
      return false;
    }
  }
}
