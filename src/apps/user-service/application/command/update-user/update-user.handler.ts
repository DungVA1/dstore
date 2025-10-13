import { UserMapper } from '@apps/user-service/infrastructure/user.mapper';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IUserRepository } from '../../user-repository.interface';

import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject('IUserRepository') private readonly repo: IUserRepository,
  ) {}
  async execute(command: UpdateUserCommand): Promise<any> {
    const user = await this.repo.getById(command.id);
    if (!user) {
      throw new Error('User not found');
    }

    const mapper = new UserMapper();
    const userEntity = mapper.toEntity(user);
    if (command.password) {
      userEntity.changePassword(command.password);
    }

    if (command.name) {
      userEntity.rename(command.name);
    }

    if (command.phone) {
      userEntity.changePhoneNumber(command.phone);
    }

    await this.repo.updated(command.id, mapper.toModel(userEntity));
  }
}
