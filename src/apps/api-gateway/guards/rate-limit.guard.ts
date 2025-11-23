import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RateLimitService } from '@shared/cache/rate-limit-service';
import { Request, Response } from 'express';

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
    const options: RateLimitOptions =
      this.reflector.getAllAndOverride<RateLimitOptions>(RATE_LIMIT_KEY, [
        context.getClass(),
        context.getHandler(),
      ]);

    if (!options) {
      return true;
    }

    const ctx = context.switchToHttp();
    const req: Request = ctx.getRequest();

    const key = options.key ? options.key(req) : (req.ip as string);

    const allowed = await this.rateLimitService.consume(key, options.points);

    if (!allowed) {
      throw new ForbiddenException('Too many request');
    }

    return true;
  }
}
