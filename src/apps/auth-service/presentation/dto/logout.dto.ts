import { IsString } from 'class-validator';

export class LogoutDTO {
  @IsString()
  accountId: string;

  @IsString()
  tokenId: string;
}
