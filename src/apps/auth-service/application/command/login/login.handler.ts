import { AccountStatus } from '@apps/auth-service/common/account.enum';
import { AccountMapper } from '@apps/auth-service/infrastructure/account.mapper';
import { err, ok } from '@common/based.error';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IAccountRepository } from '../../account-repository.interface';

import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(private readonly accountRepo: IAccountRepository) {}
  async execute(command: LoginCommand): Promise<any> {
    const accountModel = await this.accountRepo.getByEmail(command.email);
    if (!accountModel) {
      return err(new Error('ACCOUNT_NOT_EXISTS'));
    }
    const mapper = new AccountMapper();
    const account = mapper.toEntity(accountModel);
    if (account.status !== AccountStatus.ACTIVE) {
      return err(new Error('ACCOUNT_NOT_ACTIVE'));
    }

    // check password
    if (account.password !== command.password) {
      return err(new Error('PASSWORD_IS_WRONG'));
    }

    return ok({
      accessToken: 'fake-access-token',
      refreshToke: 'fake-refresh-token',
    });
  }
}
