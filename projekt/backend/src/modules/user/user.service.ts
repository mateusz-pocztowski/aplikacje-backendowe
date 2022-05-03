import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async getUser(req: Request): Promise<User> {
    return <User>req.user;
  }

  public async updateUser(body: Partial<User>, req: Request): Promise<User> {
    const user = <User>req.user;

    // TODO: implement for other properties
    user.name = body.name;

    return this.repository.save(user);
  }
}
