import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import {
  GetUserRequest,
  LoginRequest,
  RegisterRequest,
  ValidateRequest,
  UpdateRoleRequest,
  UserRole,
} from './auth.pb';

export class GetUserRequestDto implements GetUserRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly userId: number;
}

export class LoginRequestDto implements LoginRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class RegisterRequestDto implements RegisterRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;
}

export class ValidateRequestDto implements ValidateRequest {
  @IsString()
  public readonly token: string;
}

export class UpdateRoleRequestDto implements UpdateRoleRequest {
  @IsEmail()
  public readonly email: string;

  @IsEnum(UserRole)
  public readonly role: UserRole;
}
