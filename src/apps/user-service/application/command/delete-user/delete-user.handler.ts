import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IUserRepository } from '../../user-repository.interface';

import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @Inject('IUserRepository') private readonly repo: IUserRepository,
  ) {}
  execute(command: DeleteUserCommand): Promise<any> {
    return this.repo.delete(command.id);
  }
}
