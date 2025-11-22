import { SuccessResponse } from '@common/based.response';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IAccountRepository } from '../../account-repository.interface';

import { LogoutCommand } from './logout.command';

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
  constructor(
    @Inject('IAccountRepository')
    private readonly repo: IAccountRepository,
  ) {}

  async execute(command: LogoutCommand): Promise<SuccessResponse> {
    await this.repo.invalidRefreshTokens(command.accountId);

    return new SuccessResponse();
  }
}
