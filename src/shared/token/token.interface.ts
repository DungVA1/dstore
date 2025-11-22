export interface TokenPayload {
  accountId: string;
  jti?: string;
}

export type TokenPair = {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
};
