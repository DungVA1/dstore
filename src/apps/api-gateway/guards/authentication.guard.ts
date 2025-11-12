import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ITokenPayload } from '@shared/token/token.interface';
import { TokenService } from '@shared/token/token.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request: Request & { user: ITokenPayload } = context
      .switchToHttp()
      .getRequest();
    const { authorization } = request.headers;
    const [type, token] = authorization?.split(' ') ?? [];
    if (type !== 'Bearer' && !token) {
      throw new UnauthorizedException('Unauthencated');
    }

    try {
      const payload: ITokenPayload =
        await this.tokenService.validateToken(token);
      request.headers['x-account-id'] = payload.accountId;
    } catch (e) {
      throw new UnauthorizedException(e);
    }

    return true;
  }
}
