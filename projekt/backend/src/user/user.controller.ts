import {
  Controller,
  Req,
  Get,
  Put,
  Body,
  Inject,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import {
  UpdateUserNameDTO,
  UpdateUserRoleDTO,
} from '../../services/user/src/user/user.dto';
import { User } from '../../services/user/src/user/user.entity';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getUser(@Req() req: Request): Promise<User> {
    return this.service.getUser(req);
  }

  @Put('name')
  updateUserName(
    @Body() body: UpdateUserNameDTO,
    @Req() req: Request,
  ): Promise<User> {
    return this.service.updateUserName(body, req);
  }

  @Put('role')
  updateUserRole(
    @Body() body: UpdateUserRoleDTO,
    @Req() req: Request,
  ): Promise<User> {
    return this.service.updateUserRole(body, req);
  }
}
