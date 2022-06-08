import { Repository } from 'typeorm';
import { Request } from 'express';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UpdateUserNameDTO, UpdateUserRoleDTO } from './user.dto';
import { Role } from '../roles/roles.enum';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async getUser(req: Request): Promise<User> {
    return req.user;
  }

  async updateUserName(
    { name }: UpdateUserNameDTO,
    req: Request,
  ): Promise<User> {
    let user = await this.repository.findOne({ where: { name: name } });

    if (user) {
      throw new HttpException(`User name already exists`, HttpStatus.CONFLICT);
    }

    user = req.user;

    if (name) {
      user.name = name;
    }

    return this.repository.save(user);
  }

  async updateUserRole(
    { role, name }: UpdateUserRoleDTO,
    req: Request,
  ): Promise<User> {
    if (!Object.values(Role).includes(role)) {
      throw new HttpException('Invalid role', HttpStatus.BAD_REQUEST);
    }

    const user = await this.repository.findOne({ where: { name: name } });

    if (!user) {
      throw new HttpException("User doesn't exists", HttpStatus.CONFLICT);
    }

    const requestUser = req.user;

    if (requestUser?.role === user.role) {
      throw new HttpException(
        'You can not change your own role',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.role = role;

    return this.repository.save(user);
  }
}
