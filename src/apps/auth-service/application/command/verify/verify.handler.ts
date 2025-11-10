import { AccountStatus } from '@apps/auth-service/common/account.enum';
import { AccountMapper } from '@apps/auth-service/infrastructure/account.mapper';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  AccountAlreadyActivedError,
  AccountIsLockedError,
  AccountIsNotRegistered,
  EmailNotExistedError,
} from '../../account-application.error';
import { IAccountRepository } from '../../account-repository.interface';

import { VerifyCodeCommand } from './verify.command';

@CommandHandler(VerifyCodeCommand)
export class VerifyCodeHandler implements ICommandHandler<VerifyCodeCommand> {
  constructor(
    @Inject('IAccountRepository')
    private readonly repo: IAccountRepository,
  ) {}

  async execute(command: VerifyCodeCommand) {
    const { email } = command;
    const accountModel = await this.repo.getByEmail(email);
    const accountMapper = new AccountMapper();
    if (!accountModel) {
      throw new EmailNotExistedError();
    }
    const account = accountMapper.toEntity(accountModel);
    switch (account.status) {
      case AccountStatus.ACTIVE:
        throw new AccountAlreadyActivedError();
      case AccountStatus.LOCKED:
        throw new AccountIsLockedError();
      case AccountStatus.DELETED:
        throw new AccountIsNotRegistered();
    }
  }
}
