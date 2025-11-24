import { AccountStatus } from '@apps/auth-service/common/account.enum';
import { AccountMapper } from '@apps/auth-service/infrastructure/account.mapper';
import { SuccessResponse } from '@common/based.response';
import { EncryptionLib } from '@libs/encrypt/encryption.lib';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CacheService } from '@shared/cache/cache.service';
import { GeneratorService } from '@shared/generator/generator.service';
import { NotificationService } from '@shared/notification/notification.service';

import {
  AccountAlreadyActivedError,
  EmailNotExistedError,
  RateLimitExceeded,
} from '../../account-application.error';
import { IAccountRepository } from '../../account-repository.interface';

import { ResendCodeCommand } from './resend-code.command';

@CommandHandler(ResendCodeCommand)
export class ResendCodeHandler implements ICommandHandler<ResendCodeCommand> {
  constructor(
    @Inject('IAccountRepository')
    private readonly repo: IAccountRepository,
    private readonly generatorService: GeneratorService,
    private readonly notificationService: NotificationService,
    private readonly encryptionLib: EncryptionLib,
    private readonly cacheService: CacheService,
  ) {}

  private async verifyLimit(key: string) {
    const lastSent = (await this.cacheService.get(key)) as number;
    if (lastSent) {
      const isLimited = Date.now() - 30000 <= lastSent;

      if (isLimited) {
        throw new RateLimitExceeded();
      }
    }
  }

  private async setLimit(key: string) {
    const lastSend = Date.now();
    await this.cacheService.set(key, lastSend);
  }

  async execute(command: ResendCodeCommand): Promise<SuccessResponse> {
    const key = `resendOtp:${command.email}`;
    await this.verifyLimit(key);

    const accountModel = await this.repo.getByEmail(command.email);
    if (!accountModel) {
      throw new EmailNotExistedError();
    }
    const mapper = new AccountMapper();
    const account = mapper.toEntity(accountModel);
    if (account.status !== AccountStatus.PENDING) {
      throw new AccountAlreadyActivedError();
    }

    await this.repo.invalidAllVerificationTokens(account.id.toString());
    const verificationCode = this.generatorService.generateOTP();
    this.repo.createVerificationToken(
      this.generatorService.generateId(),
      account.id.toString(),
      await this.encryptionLib.hashString(verificationCode),
    );

    this.notificationService.send('Email', {
      sendTo: [command.email],
      content: verificationCode,
    });

    await this.setLimit(key);
    return new SuccessResponse();
  }
}
