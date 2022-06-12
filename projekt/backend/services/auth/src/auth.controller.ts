import { MessagePattern } from '@nestjs/microservices';
import { Controller, Inject, Logger } from '@nestjs/common';
import { User } from './user/user.entity';
import { RegisterDTO, LoginDTO, AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @MessagePattern({ role: 'auth', cmd: 'register' })
  async register(body: RegisterDTO): Promise<User & AuthDTO> {
    return this.service.register(body);
  }

  @MessagePattern({ role: 'auth', cmd: 'login' })
  async login(body: LoginDTO): Promise<AuthDTO> {
    return this.service.login(body);
  }

  @MessagePattern({ role: 'auth', cmd: 'refresh' })
  async refresh(user: User): Promise<string> {
    return this.service.refresh(user);
  }

  @MessagePattern({ role: 'auth', cmd: 'check' })
  async checkIsLoggedIn({ jwt }): Promise<boolean> {
    try {
      const res = this.service.validate(jwt);

      return res;
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }
}
