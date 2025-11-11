import { IsString } from 'class-validator';

export class VerifyTokenDTO {
  @IsString()
  email: string;

  @IsString()
  token: string;
}
