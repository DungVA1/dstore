import { IMapper } from '@common/based.mapper';

import { VerificationToken } from '../common/verification-token.type';
import { AccountEntity } from '../domain/account.entity';

import { AccountModel } from './account.model';
import { VerificationTokenModel } from './verification-code.model';

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
    if (accountEntity.verificationTokens?.length) {
      accountModel.verificationTokens = accountEntity.verificationTokens?.map(
        (verToken) => {
          const verTokenModel = new VerificationTokenModel();
          verTokenModel.id = verToken.id;
          verTokenModel.token = verToken.token;
          verTokenModel.accountId = accountModel.id;
          verTokenModel.attempts = verToken.attempts;
          verTokenModel.usedAt = verToken.usedAt;
          verTokenModel.expiredAt = verToken.expiredAt;
          verTokenModel.createdAt = verToken.createdAt;

          return verTokenModel;
        },
      );
    }

    return accountModel;
  }

  toEntity(accountModel: AccountModel): AccountEntity {
    return AccountEntity.rehydrate({
      id: accountModel.id,
      email: accountModel.email,
      password: accountModel.password,
      status: accountModel.status,
      role: accountModel.role,
      verificationTokens:
        accountModel.verificationTokens?.map((verTokenModel) => {
          const verToken = new VerificationToken(
            verTokenModel.id,
            verTokenModel.token,
            verTokenModel.expiredAt,
            verTokenModel.attempts,
            verTokenModel.createdAt,
            verTokenModel.usedAt,
          );

          return verToken;
        }) || [],
      createdAt: accountModel.createdAt,
      updatedAt: accountModel.updatedAt,
    });
  }
}
