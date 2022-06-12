import { Repository } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UpdateUserNameDTO, UpdateUserRoleDTO } from './user.dto';
import { Role } from '../roles/roles.enum';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async updateUserName({
    name,
    user: reqUser,
  }: UpdateUserNameDTO): Promise<User> {
    const user = await this.repository.findOne({ where: { name: name } });

    if (user) {
      throw new RpcException({
        status: HttpStatus.CONFLICT,
        message: 'User name already exists',
      });
    }

    if (name) {
      reqUser.name = name;
    }

    return this.repository.save(reqUser);
  }

  async updateUserRole({ role, name }: UpdateUserRoleDTO): Promise<User> {
    if (!Object.values(Role).includes(role)) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid role',
      });
    }

    const user = await this.repository.findOne({ where: { name: name } });

    if (!user) {
      throw new RpcException({
        status: HttpStatus.CONFLICT,
        message: `User doesn't exists`,
      });
    }

    if (role === user.role) {
      throw new RpcException({
        status: HttpStatus.CONFLICT,
        message: `You can not change your own role`,
      });
    }

    user.role = role;

    return this.repository.save(user);
  }
}
