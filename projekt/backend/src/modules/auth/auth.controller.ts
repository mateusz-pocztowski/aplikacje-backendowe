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
import { RegisterDto, LoginDto, AuthDto } from 'src/modules/auth/auth.dto';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
import { AuthService } from 'src/modules/auth/auth.service';

@Controller('api/auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  register(@Body() body: RegisterDto): Promise<User & AuthDto> {
    return this.service.register(body);
  }

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  login(@Body() body: LoginDto): Promise<AuthDto> {
    return this.service.login(body);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  refresh(@Req() { user }: Request): Promise<string> {
    return this.service.refresh(<User>user);
  }
}
