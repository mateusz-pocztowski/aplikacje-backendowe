import { Request } from 'express';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard as NestJSAuthGuard, IAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends NestJSAuthGuard('jwt') implements IAuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const { user }: Request = context.switchToHttp().getRequest();

    return !!user;
  }
}
