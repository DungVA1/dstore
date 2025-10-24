import { AccountEntity } from '@apps/auth-service/domain/account.entity';
import { AccountMapper } from '@apps/auth-service/infrastructure/account.mapper';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IAccountRepository } from '../../account-repository.interface';

import { RegisterCommand } from './register.command';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  // TODO: Implement hash password and send verification email
  async execute(command: RegisterCommand): Promise<any> {
    const accountEntity = AccountEntity.create({
      email: command.email,
      password: command.password,
    });

    const mapper = new AccountMapper();
    await this.accountRepository.save(mapper.toModel(accountEntity));

    return accountEntity;
  }
}
