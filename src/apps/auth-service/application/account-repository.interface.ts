import { AccountModel } from '../infrastructure/account.model';

export interface IAccountRepository {
  save(account: AccountModel): Promise<AccountModel>;
  update(id: string, account: AccountModel): Promise<AccountModel>;
  getById(id: string): Promise<AccountModel | null>;
  getByEmail(email: string): Promise<AccountModel | null>;
  getList(options: Record<string, any>): Promise<AccountModel[]>;
}
