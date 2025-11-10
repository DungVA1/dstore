import { AccountEntity } from '@apps/auth-service/domain/account.entity';
import { AccountMapper } from '@apps/auth-service/infrastructure/account.mapper';
import { SuccessResponse } from '@common/based.response';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { EmailAlreadyUsedError } from '../../account-application.error';
import { IAccountRepository } from '../../account-repository.interface';

import { RegisterCommand } from './register.command';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject('IAccountRepository')
    private readonly repo: IAccountRepository,
  ) {}

  // TODO: Implement hash password and send verification email
  async execute(command: RegisterCommand): Promise<any> {
    const existedAccount = await this.repo.getByEmail(command.email);
    if (existedAccount) {
      throw new EmailAlreadyUsedError();
    }
    const accountEntity = AccountEntity.create({
      email: command.email,
      password: command.password,
    });

    const verifyCode = Math.round(Math.random() * 1000000);

    const mapper = new AccountMapper();
    await this.repo.save(mapper.toModel(accountEntity));

    return new SuccessResponse({ email: command.email, verifyCode });
  }
}
