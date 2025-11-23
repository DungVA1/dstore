import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RateLimitService } from '@shared/cache/rate-limit-service';
import { Request, Response } from 'express';
import { RateLimiterRes } from 'rate-limiter-flexible';

import { TooManyRequestError } from '../common/gateway.error';
import {
  RATE_LIMIT_KEY,
  RateLimitOptions,
} from '../decorators/rate-limit.decorator';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rateLimitService: RateLimitService,
  ) {}

  async canActivate(context: ExecutionContext) {
    let options: RateLimitOptions =
      this.reflector.getAllAndOverride<RateLimitOptions>(RATE_LIMIT_KEY, [
        context.getClass(),
        context.getHandler(),
      ]);

    if (!options) {
      options = {
        points: 1,
      };
    }

    const ctx = context.switchToHttp();
    const req: Request = ctx.getRequest();
    const res: Response = ctx.getResponse();

    const key = options.key ? options.key(req) : (req.ip as string);

    const allowed = await this.rateLimitService.consume(key, options.points);

    if (!allowed) {
      res.appendHeader('Retry-After', '60000');
      throw new TooManyRequestError();
    }

    res.appendHeader(
      'X-Remainig-Point',
      (allowed as RateLimiterRes).remainingPoints.toString(),
    );

    return true;
  }
}
