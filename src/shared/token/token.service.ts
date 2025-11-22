import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { ITokenPayload, TokenPair } from './token.interface';

type Miliseconds = number;
@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async generateToken(payload: ITokenPayload): Promise<TokenPair> {
    const jwtId = crypto.randomBytes(16).toString('hex');
    const accessToken = await this.jwt.signAsync(payload, {
      secret: this.configService.get('secret.jwt'),
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
        secret: this.configService.get('secret.jwt'),
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

  async validateToken(token: string): Promise<ITokenPayload> {
    const payload: ITokenPayload = await this.jwt.verifyAsync(token, {
      secret: this.configService.get('secret.jwt'),
    });

    return payload;
  }

  decode(token: string): Record<string, unknown> {
    return this.jwt.decode(token);
  }
}
