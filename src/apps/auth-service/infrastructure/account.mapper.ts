import { IMapper } from '@common/based.mapper';

import { AccountEntity } from '../domain/account.entity';

import { AccountModel } from './account.model';

export class AccountMapper implements IMapper {
  toModel(accountEntity: AccountEntity): AccountModel {
    const accountModel = new AccountModel();

    accountModel.id = accountEntity.id.toString();
    accountModel.email = accountEntity.email;
    accountModel.password = accountEntity.password;
    accountModel.status = accountEntity.status;
    accountModel.role = accountEntity.role;
    accountModel.createdAt = accountEntity.createdAt;
    accountModel.updatedAt = accountEntity.updatedAt;

    return accountModel;
  }

  toEntity(accountModel: AccountModel): AccountEntity {
    return AccountEntity.rehydrate({
      id: accountModel.id,
      email: accountModel.email,
      password: accountModel.password,
      status: accountModel.status,
      role: accountModel.role,
      createdAt: accountModel.createdAt,
      updatedAt: accountModel.updatedAt,
    });
  }
}
