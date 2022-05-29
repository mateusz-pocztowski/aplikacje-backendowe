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
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Role } from 'src/modules/auth/roles/role.enum';
import { Roles } from 'src/modules/auth/roles/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles/roles.guard';
import {
  UpdateUserNameDTO,
  UpdateUserRoleDTO,
} from 'src/modules/user/user.dto';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Controller('api/user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  getUser(@Req() req: Request): Promise<User> {
    return this.service.getUser(req);
  }

  @Put('name')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  updateUserName(
    @Body() body: UpdateUserNameDTO,
    @Req() req: Request,
  ): Promise<User> {
    return this.service.updateUserName(body, req);
  }

  @Put('role')
  @Roles(Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  updateUserRole(
    @Body() body: UpdateUserRoleDTO,
    @Req() req: Request,
  ): Promise<User> {
    return this.service.updateUserRole(body, req);
  }
}
