import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { User } from 'src/modules/user/user.entity';
import {
  UpdateUserNameDTO,
  UpdateUserRoleDTO,
} from 'src/modules/user/user.dto';
import { Role } from 'src/modules/auth/roles/role.enum';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async getUser(req: Request): Promise<User> {
    return <User>req.user;
  }

  async updateUserName(body: UpdateUserNameDTO, req: Request): Promise<User> {
    let user = await this.repository.findOne({ where: { name: body.name } });

    if (user) {
      throw new HttpException(`User name already exists`, HttpStatus.CONFLICT);
    }

    user = <User>req.user;

    if (body.name) {
      user.name = body.name;
    }

    return this.repository.save(user);
  }

  async updateUserRole(body: UpdateUserRoleDTO, req: Request): Promise<User> {
    if (!Object.values(Role).includes(body.role)) {
      throw new HttpException('Invalid role', HttpStatus.BAD_REQUEST);
    }

    const user = await this.repository.findOne({ where: { name: body.name } });

    if (!user) {
      throw new HttpException("User doesn't exists", HttpStatus.CONFLICT);
    }

    const requestUser = req.user as User;

    if (requestUser?.role === user.role) {
      throw new HttpException(
        'You can not change your own role',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.role = body.role;

    return this.repository.save(user);
  }
}
