export interface ITokenPayload {
  accountId: string;
}

export type TokenPair = { accessToken: string; refreshToken?: string };
