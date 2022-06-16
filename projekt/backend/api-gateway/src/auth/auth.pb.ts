/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'auth';

export enum UserRole {
  OWNER = 0,
  ADMIN = 1,
  USER = 2,
  UNRECOGNIZED = -1,
}

export interface GetUserData {
  id: number;
  email: string;
  role: UserRole;
}

export interface GetUserRequest {
  userId: number;
}

export interface GetUserResponse {
  status: number;
  error: string[];
  data: GetUserData | undefined;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: number;
  error: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  error: string[];
  token: string;
  role: UserRole;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  userId: number;
  role: UserRole;
}

export interface UpdateRoleRequest {
  role: UserRole;
  email: string;
}

export interface UpdateRoleResponse {
  status: number;
  error: string[];
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthServiceClient {
  getUser(request: GetUserRequest): Observable<GetUserResponse>;

  register(request: RegisterRequest): Observable<RegisterResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;

  updateRole(request: UpdateRoleRequest): Observable<UpdateRoleResponse>;
}

export interface AuthServiceController {
  getUser(
    request: GetUserRequest,
  ): Promise<GetUserResponse> | Observable<GetUserResponse> | GetUserResponse;

  register(
    request: RegisterRequest,
  ):
    | Promise<RegisterResponse>
    | Observable<RegisterResponse>
    | RegisterResponse;

  login(
    request: LoginRequest,
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  validate(
    request: ValidateRequest,
  ):
    | Promise<ValidateResponse>
    | Observable<ValidateResponse>
    | ValidateResponse;

  updateRole(
    request: UpdateRoleRequest,
  ):
    | Promise<UpdateRoleResponse>
    | Observable<UpdateRoleResponse>
    | UpdateRoleResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'getUser',
      'register',
      'login',
      'validate',
      'updateRole',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTH_SERVICE_NAME = 'AuthService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
