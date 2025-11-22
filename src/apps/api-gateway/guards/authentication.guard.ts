import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CacheService } from '@shared/cache/cache.service';
import { LoggerService } from '@shared/logger/logger.service';
import { TokenPayload } from '@shared/token/token.interface';
import { TokenService } from '@shared/token/token.service';
import { Request } from 'express';

import { UnauthenicationError } from '../common/gateway.error';
import { IS_PUBLIC_KEY } from '../decorators/public-api.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
    private readonly logger: LoggerService,
    private readonly cacheService: CacheService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request: Request & { user: TokenPayload } = context
      .switchToHttp()
      .getRequest();
    const { authorization } = request.headers;
    const [type, token] = authorization?.split(' ') ?? [];
    if (type !== 'Bearer' && !token) {
      throw new UnauthenicationError();
    }

    try {
      const { accountId, jti }: TokenPayload =
        await this.tokenService.validateToken(token);

      const invalidToken = await this.cacheService.get(
        `${accountId}_logout_token_id`,
      );

      console.log(invalidToken, jti)
      if (invalidToken === jti) {
        throw new UnauthenicationError();
      }

      request.headers['x-account-id'] = accountId;
      request.headers['x-jwt-id'] = jti;
    } catch (e) {
      this.logger.error(e);
      throw new UnauthenicationError();
    }

    return true;
  }
}
