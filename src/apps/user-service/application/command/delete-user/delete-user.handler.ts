import { Inject, Injectable } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { IUserRepository } from '../../user-repository.interface';

import { DeleteUserCommand } from './delete-user.command';

@Injectable()
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @Inject('IUserRepository') private readonly repo: IUserRepository,
  ) {}
  execute(command: DeleteUserCommand): Promise<any> {
    return this.repo.delete(command.id);
  }
}
