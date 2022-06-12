import {
  ClassSerializerInterceptor,
  Controller,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { UpdateUserNameDTO, UpdateUserRoleDTO } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'update_name' })
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  updateUserName(data: UpdateUserNameDTO): Promise<User> {
    return this.service.updateUserName(data);
  }

  @MessagePattern({ role: 'user', cmd: 'update_role' })
  @Roles(Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  updateUserRole(data: UpdateUserRoleDTO): Promise<User> {
    return this.service.updateUserRole(data);
  }
}
