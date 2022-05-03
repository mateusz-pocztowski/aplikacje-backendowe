import { Trim } from 'class-sanitizer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @Trim()
  @IsEmail()
  public readonly email: string;

  @Trim()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  public readonly password: string;

  @Trim()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  public readonly name: string;
}

export class LoginDto {
  @Trim()
  @IsEmail()
  public readonly email: string;

  @Trim()
  @IsString()
  public readonly password: string;
}

export class AuthDto {
  @Trim()
  @IsString()
  public readonly jwt_token: string;
}
