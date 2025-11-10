import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IAccountRepository } from '../application/account-repository.interface';

import { AccountModel } from './account.model';

export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(AccountModel)
    private readonly accountModel: Repository<AccountModel>,
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
}
