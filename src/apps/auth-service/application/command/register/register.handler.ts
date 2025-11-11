import { AccountEntity } from '@apps/auth-service/domain/account.entity';
import { AccountMapper } from '@apps/auth-service/infrastructure/account.mapper';
import { SuccessResponse } from '@common/based.response';
import { Encrypt } from '@libs/encrypt/hash-string';
import { Generator } from '@libs/generator/generator';
import { Notification } from '@libs/notification/notification.service';
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

    const verificationCode = Math.round(Math.random() * 1000000).toString();
    const current = new Date();
    const accountEntity = AccountEntity.create({
      email: command.email,
      password: await Encrypt.hashString(command.password),
      verificationTokens: [
        {
          id: Generator.generateId(),
          attempts: 0,
          createdAt: current,
          expiredAt: new Date(current.setMinutes(current.getMinutes() + 5)),
          token: await Encrypt.hashString(verificationCode),
        },
      ],
    });

    const mapper = new AccountMapper();
    await this.repo.save(mapper.toModel(accountEntity));
    const notifService = new Notification('Email');
    notifService.send({
      sendTo: [accountEntity.email],
      content: verificationCode,
    });
    return new SuccessResponse({ email: command.email, verificationCode });
  }
}
