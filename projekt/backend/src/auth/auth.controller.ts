import {
  Body,
  Controller,
  Inject,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import {
  RegisterDTO,
  LoginDTO,
  AuthDTO,
} from '../../services/auth/src/auth.dto';
import { AuthService } from './auth.service';
import { User } from '../../services/user/src/user/user.entity';

@Controller('api/auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  register(@Body() body: RegisterDTO): Promise<User & AuthDTO> {
    return this.service.register(body);
  }

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  login(@Body() body: LoginDTO): Promise<AuthDTO> {
    return this.service.login(body);
  }

  @Post('refresh')
  refresh(@Req() { user }: Request): Promise<string> {
    return this.service.refresh(user);
  }
}
