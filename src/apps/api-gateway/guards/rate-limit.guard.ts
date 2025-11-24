// custom-throttler.guard.ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerLimitDetail } from '@nestjs/throttler';
import { Response } from 'express';

import { TooManyRequestError } from '../common/gateway.error';

@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
  protected throwThrottlingException(
    context: ExecutionContext,
    throttlerLimitDetail: ThrottlerLimitDetail,
  ): Promise<void> {
    const response: Response = context.switchToHttp().getResponse();
    response.header(
      'X-RateLimit-Reset',
      throttlerLimitDetail.timeToBlockExpire.toString(),
    );
    response.header('X-RateLimit-Limit', throttlerLimitDetail.limit.toString());
    response.header('X-RateLimit-TTL', throttlerLimitDetail.ttl.toString());
    throw new TooManyRequestError();
  }
}
