import { UserEntity } from '@apps/user-service/domain/user.entity';
import { UserMapper } from '@apps/user-service/infrastructure/user.mapper';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import mapDomainErrorToHttpException from '../../user.application-error-mapper';
import { IUserRepository } from '../../user-repository.interface';

import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject('IUserRepository') private readonly repo: IUserRepository,
  ) {}
  execute(command: CreateUserCommand): Promise<any> {
    const user = UserEntity.create({
      email: command.email,
      name: command.name,
      password: command.password,
      phone: command.phone,
      type: 'USER',
    });

    if (!user.ok) {
      throw mapDomainErrorToHttpException(user.error);
    }

    const mapper = new UserMapper();

    return this.repo.save(mapper.toModel(user.value));
  }
}
