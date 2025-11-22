import { SuccessResponse } from '@common/based.response';
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

    const token = await this.tokenService.generateToken({
      accountId: tokenPayload.accountId,
    });

    await this.repo.invalidRefreshTokens(tokenPayload.accountId);
    await this.repo.createRefreshToken(
      this.generatorService.generateId(),
      token.refreshToken,
      tokenPayload.accountId,
      token.refreshTokenExpiresAt,
    );

    return new SuccessResponse({
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    });
  }
}
