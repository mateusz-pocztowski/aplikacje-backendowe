import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { Roles } from './roles/roles.decorator';
import {
  AuthServiceClient,
  RegisterResponse,
  RegisterRequest,
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse,
  UserRole,
  UpdateRoleRequest,
  UpdateRoleResponse,
} from './auth.pb';

@Controller('api/auth')
export class AuthController implements OnModuleInit {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Get('me')
  @Roles(UserRole.OWNER, UserRole.ADMIN, UserRole.USER)
  @UseGuards(AuthGuard)
  private async getUser(
    @Req() req: Request,
  ): Promise<Observable<RegisterResponse>> {
    return this.svc.getUser({ userId: req.user });
  }

  @Post('register')
  private async register(
    @Body() body: RegisterRequest,
  ): Promise<Observable<RegisterResponse>> {
    return this.svc.register(body);
  }

  @Post('login')
  private async login(
    @Body() body: LoginRequest,
  ): Promise<Observable<LoginResponse>> {
    return this.svc.login(body);
  }

  @Put('role')
  @Roles(UserRole.OWNER)
  @UseGuards(AuthGuard)
  private async updateRole(
    @Body() body: UpdateRoleRequest,
  ): Promise<Observable<UpdateRoleResponse>> {
    return this.svc.updateRole(body);
  }
}
