import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LoggerService } from '@shared/logger/logger.service';
import { ITokenPayload } from '@shared/token/token.interface';
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
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPulict = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPulict) {
      return true;
    }
    const request: Request & { user: ITokenPayload } = context
      .switchToHttp()
      .getRequest();
    const { authorization } = request.headers;
    const [type, token] = authorization?.split(' ') ?? [];
    if (type !== 'Bearer' && !token) {
      throw new UnauthenicationError();
    }

    try {
      const payload: ITokenPayload =
        await this.tokenService.validateToken(token);
      request.headers['x-account-id'] = payload.accountId;
    } catch (e) {
      this.logger.error(e);
      throw new UnauthenicationError();
    }

    return true;
  }
}
