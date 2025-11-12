import { AccountEntity } from '@apps/auth-service/domain/account.entity';
import { AccountMapper } from '@apps/auth-service/infrastructure/account.mapper';
import { SuccessResponse } from '@common/based.response';
import { Encrypt } from '@libs/encrypt/hash-string.lib';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GeneratorService } from '@shared/generator/generator.service';
import { NotificationService } from '@shared/notification/notification.service';

import { EmailAlreadyUsedError } from '../../account-application.error';
import { IAccountRepository } from '../../account-repository.interface';

import { RegisterCommand } from './register.command';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject('IAccountRepository')
    private readonly repo: IAccountRepository,
    private readonly generatorService: GeneratorService,
    private readonly notificationService: NotificationService,
  ) {}

  async execute(command: RegisterCommand): Promise<any> {
    const existedAccount = await this.repo.getByEmail(command.email);
    if (existedAccount) {
      throw new EmailAlreadyUsedError();
    }

    const verificationCode = this.generatorService.generateOTP();
    const current = new Date();
    const accountEntity = AccountEntity.create({
      email: command.email,
      password: await Encrypt.hashString(command.password),
      verificationTokens: [
        {
          id: this.generatorService.generateId(),
          attempts: 0,
          createdAt: current,
          expiredAt: new Date(
            current.setTime(current.getTime() + 5 * 60 * 1000),
          ),
          token: await Encrypt.hashString(verificationCode),
        },
      ],
    });

    const mapper = new AccountMapper();
    await this.repo.save(mapper.toModel(accountEntity));
    this.notificationService.send('Email', {
      sendTo: [accountEntity.email],
      content: verificationCode,
    });
    return new SuccessResponse({ email: command.email, verificationCode });
  }
}
