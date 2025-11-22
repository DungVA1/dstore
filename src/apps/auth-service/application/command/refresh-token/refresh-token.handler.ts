import { SuccessResponse } from '@common/based.response';
import { EncryptionLib } from '@libs/encrypt/encryption.lib';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GeneratorService } from '@shared/generator/generator.service';
import { TokenService } from '@shared/token/token.service';

import { RefreshTokenIsInvalid } from '../../account-application.error';
import { IAccountRepository } from '../../account-repository.interface';

import { RefreshTokenCommand } from './refresh-token.command';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
  implements ICommandHandler<RefreshTokenCommand>
{
  constructor(
    @Inject('IAccountRepository')
    private readonly repo: IAccountRepository,
    private readonly tokenService: TokenService,
    private readonly generatorService: GeneratorService,
    private readonly encryptionLib: EncryptionLib,
  ) {}
  async execute(command: RefreshTokenCommand): Promise<any> {
    const tokenPayload = this.tokenService.decode(command.refreshToken) as {
      accountId: string;
    };

    if (!tokenPayload) {
      throw new RefreshTokenIsInvalid();
    }

    const refreshToken = await this.repo.getRefreshToken(
      tokenPayload.accountId,
    );

    if (!refreshToken) {
      throw new RefreshTokenIsInvalid();
    }

    const isValidToken = await this.encryptionLib.compare(
      command.refreshToken,
      refreshToken.token,
    );

    if (!isValidToken) {
      throw new RefreshTokenIsInvalid();
    }

    const token = await this.tokenService.generateToken({
      accountId: tokenPayload.accountId,
    });

    await this.repo.invalidRefreshTokens(tokenPayload.accountId);
    await this.repo.createRefreshToken(
      this.generatorService.generateId(),
      await this.encryptionLib.hashString(token.refreshToken),
      tokenPayload.accountId,
      token.refreshTokenExpiresAt,
    );

    return new SuccessResponse({
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    });
  }
}
