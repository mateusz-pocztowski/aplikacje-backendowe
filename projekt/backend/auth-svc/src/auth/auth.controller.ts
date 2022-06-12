import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetUserRequestDto,
  LoginRequestDto,
  RegisterRequestDto,
  ValidateRequestDto,
  UpdateRoleRequestDto,
} from './auth.dto';
import {
  AUTH_SERVICE_NAME,
  GetUserResponse,
  RegisterResponse,
  LoginResponse,
  ValidateResponse,
  UpdateRoleResponse,
} from './auth.pb';
import { AuthService } from './service/auth.service';

@Controller()
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @GrpcMethod(AUTH_SERVICE_NAME, 'GetUser')
  private getUser(payload: GetUserRequestDto): Promise<GetUserResponse> {
    return this.service.getUser(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
  private register(payload: RegisterRequestDto): Promise<RegisterResponse> {
    return this.service.register(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  private login(payload: LoginRequestDto): Promise<LoginResponse> {
    return this.service.login(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
  private validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
    return this.service.validate(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'UpdateRole')
  private updateRole(
    payload: UpdateRoleRequestDto,
  ): Promise<UpdateRoleResponse> {
    return this.service.updateRole(payload);
  }
}
