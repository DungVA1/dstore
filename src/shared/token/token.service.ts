import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '@shared/logger/logger.service';
import * as crypto from 'crypto';

import { ITokenPayload, TokenPair } from './token.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService,
  ) {}
  async generateToken(payload: ITokenPayload): Promise<TokenPair> {
    const jwtId = crypto.randomBytes(16).toString('hex');
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('secret.jwt'),
      algorithm: 'HS256',
      expiresIn: 15 * 60,
      jwtid: jwtId,
    });
    const refreshToken = await this.jwtService.signAsync(
      {
        type: 'refresh',
        jwtid: jwtId,
      },
      {
        secret: this.configService.get('secret.jwt'),
        algorithm: 'HS256',
        expiresIn: 30 * 24 * 60 * 60,
        jwtid: jwtId,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async renewAccessToken(refreshToken: string): Promise<string> {
    const payload: Record<string, unknown> =
      this.jwtService.decode(refreshToken);

    const jwtToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('secret.jwt'),
      expiresIn: 15 * 60,
    });

    return jwtToken;
  }

  async validateToken(token: string): Promise<ITokenPayload> {
    try {
      const payload: ITokenPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT,
      });

      return payload;
    } catch (e) {
      this.loggerService.error(e);
      throw new Error('Unauthentication');
    }
  }
}
