import { IMapper } from '@common/based.mapper';

import { UserEntity } from '../domain/user.entity';

import { UserModel } from './user.model';

export class UserMapper implements IMapper {
  toEntity(userOrm: UserModel): UserEntity {
    return UserEntity.rehydrate({
      id: userOrm.id,
      name: userOrm.name,
      email: userOrm.email,
      identityId: userOrm.identityId,
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
      identityId: userEntity.identityId,
      phone: userEntity.phone!,
      status: userEntity.status,
      type: userEntity.type,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };
  }
}
