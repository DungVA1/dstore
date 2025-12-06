import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDTO {
  @MinLength(5)
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  remember: boolean = false;
}
