import { AccountModel } from '../infrastructure/models/account.model';
import { RefreshTokenModel } from '../infrastructure/models/refresh-token.model';

export interface IAccountRepository {
  save(account: AccountModel): Promise<AccountModel>;
  update(id: string, account: AccountModel): Promise<AccountModel>;
  getById(id: string): Promise<AccountModel | null>;
  getByEmail(email: string): Promise<AccountModel | null>;
  getList(options: Record<string, any>): Promise<AccountModel[]>;
  getAccountByEmailWithTokens(email: string): Promise<AccountModel | null>;
  invalidAllVerificationTokens(accountId: string);
  createVerificationToken(id: string, accountId: string, token: string);
  increaseVerificationTokenAttemps(id: string, attemps: number);
  useVerificationToken(tokenId: string);
  getRefreshToken(accountId: string): Promise<RefreshTokenModel | null>;
  createRefreshToken(
    id: string,
    token: string,
    accountId: string,
    expiredAt: Date,
  );
  invalidRefreshTokens(accountId: string);
}
