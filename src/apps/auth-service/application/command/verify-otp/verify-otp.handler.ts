import { AccountStatus } from '@apps/auth-service/common/account.enum';
import { AccountMapper } from '@apps/auth-service/infrastructure/account.mapper';
import { SuccessResponse } from '@common/based.response';
import { EncryptionLib } from '@libs/encrypt/encryption.lib';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  AccountAlreadyActivedError,
  AccountIsLockedError,
  AccountIsNotRegistered,
  EmailNotExistedError,
  VerificationTokenIsWrongOrExpired,
} from '../../account-application.error';
import { IAccountRepository } from '../../account-repository.interface';

import { VerifyOtpCommand } from './verify-otp.command';

@CommandHandler(VerifyOtpCommand)
export class VerifyOtpHandler implements ICommandHandler<VerifyOtpCommand> {
  constructor(
    @Inject('IAccountRepository')
    private readonly repo: IAccountRepository,
    private readonly encryptionLib: EncryptionLib,
  ) {}

  async execute(command: VerifyOtpCommand): Promise<SuccessResponse> {
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
      throw new VerificationTokenIsWrongOrExpired();
    }

    if (verificationToken.attempts >= 5) {
      throw new VerificationTokenIsWrongOrExpired();
    }

    const isValid = await this.encryptionLib.compare(
      token,
      verificationToken?.token,
    );

    if (!isValid) {
      await this.repo.increaseVerificationTokenAttemps(
        verificationToken.id,
        verificationToken.attempts + 1,
      );
      throw new VerificationTokenIsWrongOrExpired();
    }
    await this.repo.useVerificationToken(verificationToken.id);

    return new SuccessResponse(account);
  }
}
