import {
  Body,
  Controller,
  Inject,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/modules/user/user.entity';
import { RegisterDTO, LoginDTO, AuthDTO } from 'src/modules/auth/auth.dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { AuthService } from 'src/modules/auth/auth.service';

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
  @UseGuards(AuthGuard)
  refresh(@Req() { user }: Request): Promise<string> {
    return this.service.refresh(<User>user);
  }
}
