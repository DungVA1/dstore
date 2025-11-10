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

    // TODO: send verification email with code to user
    const verificationCode = Math.round(Math.random() * 1000000).toString();
    const current = new Date();
    const accountEntity = AccountEntity.create({
      email: command.email,
      password: command.password,
      verificationTokens: [
        {
          id: 'abc', // TODO: Generate id
          attempts: 0,
          createdAt: current,
          expiredAt: new Date(current.setMinutes(current.getMinutes() + 5)),
          token: verificationCode,
        },
      ],
    });

    const mapper = new AccountMapper();
    await this.repo.save(mapper.toModel(accountEntity));

    return new SuccessResponse({ email: command.email, verificationCode });
  }
}
