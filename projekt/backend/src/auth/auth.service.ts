import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout, firstValueFrom } from 'rxjs';
import {
  RegisterDTO,
  LoginDTO,
  AuthDTO,
} from '../../services/auth/src/auth.dto';
import { User } from '../../services/user/src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  public async register(body: RegisterDTO): Promise<User & AuthDTO> {
    try {
      const res = await firstValueFrom(
        this.authService
          .send({ role: 'auth', cmd: 'register' }, body)
          .pipe(timeout(5000)),
      );

      return res;
    } catch (err: any) {
      Logger.error(err, 'AUTH');
      throw new HttpException(err.message, err.status);
    }
  }

  public async login(body: LoginDTO): Promise<AuthDTO> {
    try {
      const res = await firstValueFrom(
        this.authService
          .send({ role: 'auth', cmd: 'login' }, body)
          .pipe(timeout(5000)),
      );

      return res;
    } catch (err: any) {
      Logger.error(err, 'AUTH');
      throw new HttpException(err.message, err.status);
    }
  }

  public async refresh(user: User): Promise<string> {
    try {
      const res = await firstValueFrom(
        this.authService
          .send({ role: 'auth', cmd: 'refresh' }, user)
          .pipe(timeout(5000)),
      );

      return res;
    } catch (err: any) {
      Logger.error(err, 'AUTH');
      throw new HttpException(err.message, err.status);
    }
  }
}
