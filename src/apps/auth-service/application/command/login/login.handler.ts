import { AccountStatus } from '@apps/auth-service/common/account.enum';
import { AccountMapper } from '@apps/auth-service/infrastructure/account.mapper';
import { SuccessResponse } from '@common/based.response';
import { EncryptionLib } from '@libs/encrypt/encryption.lib';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GeneratorService } from '@shared/generator/generator.service';
import { LoggerService } from '@shared/logger/logger.service';
import { TokenService } from '@shared/token/token.service';

import {
  AccountIsNotActivedError,
  EmailNotExistedError,
  EmailOrPasswordIsWrongError,
} from '../../account-application.error';
import { IAccountRepository } from '../../account-repository.interface';

import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    @Inject('IAccountRepository') private readonly repo: IAccountRepository,
    private readonly tokenService: TokenService,
    private readonly loggerService: LoggerService,
    private readonly generatorService: GeneratorService,
  ) {
    this.loggerService.setContext(LoginHandler.name);
  }
  async execute(command: LoginCommand): Promise<any> {
    const accountModel = await this.repo.getByEmail(command.email);
    if (!accountModel) {
      throw new EmailNotExistedError();
    }
    const mapper = new AccountMapper();
    const account = mapper.toEntity(accountModel);
    if (account.status !== AccountStatus.ACTIVE) {
      throw new AccountIsNotActivedError();
    }

    const isValid = await EncryptionLib.compare(
      command.password,
      account.password,
    );

    if (!isValid) {
      throw new EmailOrPasswordIsWrongError();
    }

    const { accessToken, refreshToken, refreshTokenExpiresAt } =
      await this.tokenService.generateToken({
        accountId: account.id.toString(),
      });

    await this.repo.invalidRefreshTokens(account.id.toString());
    await this.repo.createRefreshToken(
      this.generatorService.generateId(),
      refreshToken,
      account.id.toString(),
      refreshTokenExpiresAt,
    );

    return new SuccessResponse({
      accessToken,
      refreshToken,
    });
  }
}
