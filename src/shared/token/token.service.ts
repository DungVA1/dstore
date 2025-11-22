import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { TokenPair, TokenPayload } from './token.interface';

type Miliseconds = number;
@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async generateToken(payload: TokenPayload): Promise<TokenPair> {
    const jwtId = crypto.randomBytes(16).toString('hex');
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: +this.configService.get('secret.access_token_expires_in'),
      jwtid: jwtId,
    });
    const refreshToken = await this.jwt.signAsync(
      {
        type: 'refresh',
        jwtid: jwtId,
        accountId: payload.accountId,
      },
      {
        expiresIn: +this.configService.get('secret.refresh_token_expires_in'),
        jwtid: jwtId,
      },
    );

    const current = Date.now();

    const accessTokenExpiresIn: Miliseconds =
      +this.configService.get('secret.access_token_expires_in') * 1000;
    const refreshTokenExpiresIn: Miliseconds =
      +this.configService.get('secret.refresh_token_expires_in') * 1000;
    return {
      accessToken,
      accessTokenExpiresAt: new Date(current + accessTokenExpiresIn),
      refreshToken,
      refreshTokenExpiresAt: new Date(current + refreshTokenExpiresIn),
    };
  }

  async validateToken(token: string): Promise<TokenPayload> {
    const payload: TokenPayload = await this.jwt.verifyAsync(token);

    return payload;
  }
}
