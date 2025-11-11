import { Generator } from '@libs/generator/generator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IAccountRepository } from '../application/account-repository.interface';

import { AccountModel } from './account.model';
import { VerificationTokenModel } from './verification-code.model';

export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(AccountModel)
    private readonly accountModel: Repository<AccountModel>,
    @InjectRepository(VerificationTokenModel)
    private readonly verificationTokenModel: Repository<VerificationTokenModel>,
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
    return this.accountModel.findOne({
      where: {
        email,
      },
      relations: ['verificationTokens'],
    });
  }

  invalidAllTokens(accountId: string) {
    return this.verificationTokenModel.update(
      { accountId },
      { expiredAt: new Date() },
    );
  }

  async createVerificationToken(accountId: string, token: string) {
    const current = new Date();
    const id = Generator.generateId();
    await this.verificationTokenModel.save({
      id: Generator.generateId(),
      accountId: accountId,
      attempts: 0,
      expiredAt: new Date(current.setTime(current.getTime() + 5 * 60 * 1000)),
      token: token,
    });

    return id;
  }
}
