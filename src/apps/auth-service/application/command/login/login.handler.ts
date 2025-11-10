import { AccountStatus } from '@apps/auth-service/common/account.enum';
import { AccountMapper } from '@apps/auth-service/infrastructure/account.mapper';
import { SuccessResponse } from '@common/based.response';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
  ) {}
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

    // TODO: Compare plain password vs hash password
    if (account.password !== command.password) {
      throw new EmailOrPasswordIsWrongError();
    }

    // TODO: Generate JWT token
    return new SuccessResponse({
      accessToken: 'fake-access-token',
      refreshToke: 'fake-refresh-token',
    });
  }
}
