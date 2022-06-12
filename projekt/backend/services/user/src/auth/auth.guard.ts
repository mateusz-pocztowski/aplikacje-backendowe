import { CanActivate, ExecutionContext, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { timeout } from 'rxjs/operators';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const res = await firstValueFrom(
        this.authService
          .send({ role: 'auth', cmd: 'check' }, { jwt: req.jwt })
          .pipe(timeout(5000)),
      );

      return res;
    } catch (err) {
      Logger.error(err, 'AUTH');
      return false;
    }
  }
}
