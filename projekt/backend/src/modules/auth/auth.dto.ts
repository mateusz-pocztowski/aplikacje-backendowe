import { Trim } from 'class-sanitizer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDTO {
  @Trim()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  readonly name: string;

  @Trim()
  @IsEmail()
  readonly email: string;

  @Trim()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  readonly password: string;
}

export class LoginDTO {
  @Trim()
  @IsEmail()
  readonly email: string;

  @Trim()
  @IsString()
  readonly password: string;
}

export class AuthDTO {
  @Trim()
  @IsString()
  readonly jwt_token: string;
}
