import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserRole } from './auth.pb';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  @Inject(AuthService)
  public readonly service: AuthService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: Request = ctx.switchToHttp().getRequest();
    const authorization: string = req.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const bearer: string[] = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException();
    }

    const token: string = bearer[1];

    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [ctx.getHandler(), ctx.getClass()],
    );

    const { status, userId, role } = await this.service.validate({ token });

    if (requiredRoles != null && !requiredRoles?.includes(role)) {
      throw new UnauthorizedException('Unauthorized role');
    }

    if (status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    req.user = userId;

    return true;
  }
}
