import { IMapper } from '@common/based.mapper';

import { UserEntity } from '../domain/user.entity';

import { UserModel } from './user.orm';

export class UserMapper implements IMapper {
  toEntity(userOrm: UserModel): UserEntity {
    return UserEntity.rehydrate({
      id: userOrm.id,
      name: userOrm.name,
      email: userOrm.email,
      password: userOrm.password,
      phone: userOrm.phone,
      type: userOrm.type,
      status: userOrm.status,
      createdAt: userOrm.createdAt,
      updatedAt: userOrm.updatedAt,
    });
  }

  toModel(userEntity: UserEntity): UserModel {
    return {
      id: userEntity.id!,
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
      phone: userEntity.password,
      status: userEntity.status,
      type: userEntity.type,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };
  }
}
