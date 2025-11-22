import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

export interface ICache {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, expiredAt?: number): Promise<'OK' | null>;
  del(key: string): Promise<number>;
}

@Injectable()
export class CacheService implements ICache {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async set(key: string, value: string, expiredAt?: number): Promise<'OK' | null> {
    if (expiredAt) {
      return await this.redis.set(key, value, 'EX', expiredAt);
    }
    return await this.redis.set(key, value);
  }

  async del(key: string): Promise<number> {
    return await this.redis.del(key);
  }
}
