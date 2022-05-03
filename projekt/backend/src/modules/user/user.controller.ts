import {
  ClassSerializerInterceptor,
  Controller,
  Req,
  UseGuards,
  UseInterceptors,
  Get,
  Put,
  Body,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Controller('api/user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  getUser(@Req() req: Request): Promise<User> {
    return this.service.getUser(req);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  updateUser(@Body() body: Partial<User>, @Req() req: Request): Promise<User> {
    return this.service.updateUser(body, req);
  }
}
