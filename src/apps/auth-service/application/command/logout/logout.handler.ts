import { SuccessResponse } from '@common/based.response';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CacheService } from '@shared/cache/cache.service';

import { IAccountRepository } from '../../account-repository.interface';

import { LogoutCommand } from './logout.command';

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
  constructor(
    @Inject('IAccountRepository')
    private readonly repo: IAccountRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(command: LogoutCommand): Promise<SuccessResponse> {
    await this.repo.invalidRefreshTokens(command.accountId);
    const key = `${command.accountId}_logout_token_id`;
    await this.cacheService.set(key, command.tokenId);

    return new SuccessResponse();
  }
}
