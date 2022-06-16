import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  @Inject(AuthService)
  public readonly service: AuthService;

  async intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req: Request = ctx.switchToHttp().getRequest();

    const authorization = req.headers['authorization'];
    const token = authorization?.split(' ')[1];

    if (token) {
      const { status, userId } = await this.service.validate({ token });

      if (status === HttpStatus.OK) {
        req.user = userId;
      }
    }

    return next.handle();
  }
}
