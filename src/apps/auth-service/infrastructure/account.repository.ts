import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IAccountRepository } from '../application/account-repository.interface';

import { AccountModel } from './models/account.model';
import { RefreshTokenModel } from './models/refresh-token.model';
import { VerificationTokenModel } from './models/verification-code.model';

export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(AccountModel)
    private readonly accountModel: Repository<AccountModel>,
    @InjectRepository(VerificationTokenModel)
    private readonly verificationTokenModel: Repository<VerificationTokenModel>,
    @InjectRepository(RefreshTokenModel)
    private readonly refreshTokenModel: Repository<RefreshTokenModel>,
  ) {}
  async save(account: AccountModel) {
    await this.accountModel.save(account);

    return account;
  }

  async update(id: string, account: AccountModel): Promise<AccountModel> {
    await this.accountModel.update(id, account);
    return account;
  }

  getById(id: string): Promise<AccountModel | null> {
    return this.accountModel.findOneBy({ id });
  }

  getByEmail(email: string): Promise<AccountModel | null> {
    return this.accountModel.findOneBy({ email });
  }

  getList(options: Record<string, any>): Promise<AccountModel[]> {
    return this.accountModel.find(options);
  }

  getAccountByEmailWithTokens(email: string): Promise<AccountModel | null> {
    return this.accountModel
      .createQueryBuilder('account')
      .leftJoinAndSelect(
        'account.verificationTokens',
        'token',
        'token.expired_at > :now AND token.used_at IS NULL',
        {
          now: new Date(),
        },
      )
      .where('account.email = :email', { email })
      .getOne();
  }

  invalidAllVerificationTokens(accountId: string) {
    return this.verificationTokenModel.update(
      { accountId },
      { expiredAt: new Date() },
    );
  }

  async createVerificationToken(id: string, accountId: string, token: string) {
    const current = new Date();
    await this.verificationTokenModel.save({
      id,
      accountId: accountId,
      attempts: 0,
      expiredAt: new Date(current.setTime(current.getTime() + 5 * 60 * 1000)),
      token: token,
    });

    return id;
  }

  async useVerificationToken(tokenId: string) {
    const current = new Date();
    await this.verificationTokenModel.update(tokenId, {
      usedAt: current,
    });
  }

  getRefreshToken(refreshToken: string): Promise<RefreshTokenModel | null> {
    return this.refreshTokenModel.findOne({
      where: {
        refreshToken,
      },
    });
  }
  createRefreshToken(
    id: string,
    refreshToken: string,
    accountId: string,
    expiredAt: Date,
  ) {
    return this.refreshTokenModel.save({
      id,
      accountId,
      refreshToken,
      expiredAt,
      createdAt: new Date(),
    });
  }
  useRefreshToken(id: string) {
    return this.refreshTokenModel.delete(id);
  }
}
