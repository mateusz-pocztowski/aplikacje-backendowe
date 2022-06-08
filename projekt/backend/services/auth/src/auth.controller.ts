import { MessagePattern } from '@nestjs/microservices';
import { Body, Controller, Inject, Req, Logger } from '@nestjs/common';
import { Request } from 'express';
import { User } from './user/user.entity';
import { RegisterDTO, LoginDTO, AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @MessagePattern({ role: 'auth', cmd: 'register' })
  async register(@Body() body: RegisterDTO): Promise<User & AuthDTO> {
    return this.service.register(body);
  }

  @MessagePattern({ role: 'auth', cmd: 'login' })
  async login(@Body() body: LoginDTO): Promise<AuthDTO> {
    return this.service.login(body);
  }

  @MessagePattern({ role: 'auth', cmd: 'refresh' })
  async refresh(@Req() { user }: Request): Promise<string> {
    return this.service.refresh(user);
  }

  @MessagePattern({ role: 'auth', cmd: 'check' })
  async checkIsLoggedIn({ jwt }) {
    try {
      const res = this.service.validate(jwt);

      return res;
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }
}
