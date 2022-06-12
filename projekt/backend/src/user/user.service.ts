import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import {
  UpdateUserNameDTO,
  UpdateUserRoleDTO,
} from '../../services/user/src/user/user.dto';
import { User } from '../../services/user/src/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  async getUser(req: Request): Promise<User> {
    return req.user;
  }

  async updateUserName(data: UpdateUserNameDTO, req: Request): Promise<User> {
    try {
      const jwt = req.headers?.['authorization']?.split(' ')[1];

      const res = await firstValueFrom(
        this.userService
          .send(
            { role: 'user', cmd: 'update_name' },
            { data: data, user: req.user, jwt },
          )
          .pipe(timeout(5000)),
      );

      return res;
    } catch (err: any) {
      Logger.error(err, 'USER');
      throw new HttpException(err.message, err.status);
    }
  }

  async updateUserRole(data: UpdateUserRoleDTO, req: Request): Promise<User> {
    try {
      const jwt = req.headers?.['authorization']?.split(' ')[1];

      const res = await firstValueFrom(
        this.userService
          .send<User>(
            { role: 'user', cmd: 'update_role' },
            { data: data, user: req.user, jwt },
          )
          .pipe(timeout(5000)),
      );

      return res;
    } catch (err: any) {
      Logger.error(err, 'USER');
      throw new HttpException(err.message, err.status);
    }
  }
}
