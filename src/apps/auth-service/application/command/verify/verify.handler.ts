import { AccountStatus } from '@apps/auth-service/common/account.enum';
import { AccountMapper } from '@apps/auth-service/infrastructure/account.mapper';
import { SuccessResponse } from '@common/based.response';
import { Encrypt } from '@libs/encrypt/hash-string.lib';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  AccountAlreadyActivedError,
  AccountIsLockedError,
  AccountIsNotRegistered,
  EmailNotExistedError,
  VerificationTokenIsWroingOrExpired,
} from '../../account-application.error';
import { IAccountRepository } from '../../account-repository.interface';

import { VerifyTokenCommand } from './verify.command';

@CommandHandler(VerifyTokenCommand)
export class VerifyTokenHandler implements ICommandHandler<VerifyTokenCommand> {
  constructor(
    @Inject('IAccountRepository')
    private readonly repo: IAccountRepository,
  ) {}

  async execute(command: VerifyTokenCommand) {
    const { email, token } = command;
    const accountModel = await this.repo.getAccountByEmailWithTokens(email);
    if (!accountModel) {
      throw new EmailNotExistedError();
    }
    const accountMapper = new AccountMapper();
    const account = accountMapper.toEntity(accountModel);
    switch (account.status) {
      case AccountStatus.ACTIVE:
        throw new AccountAlreadyActivedError();
      case AccountStatus.LOCKED:
        throw new AccountIsLockedError();
      case AccountStatus.DELETED:
        throw new AccountIsNotRegistered();
    }

    const verificationToken = account.verificationTokens[0];
    if (!verificationToken) {
      throw new VerificationTokenIsWroingOrExpired();
    }
    const isValid = await Encrypt.compare(token, verificationToken?.token);

    if (!isValid) {
      throw new VerificationTokenIsWroingOrExpired();
    }
    await this.repo.useToken(verificationToken.id);

    return new SuccessResponse(account);
  }
}
