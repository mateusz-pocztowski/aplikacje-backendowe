import * as bcrypt from 'bcryptjs';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthHelper {
  @InjectRepository(User)
  private readonly repository: Repository<User>;
  private readonly jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token);
  }

  async validateUser(decoded: any): Promise<User> {
    return this.repository.findOne({ where: { id: decoded?.id } });
  }

  generateToken(user: User): string {
    return this.jwt.sign({ id: user.id, email: user.email });
  }

  isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  async validate(token: string): Promise<boolean> {
    const decoded: unknown = this.jwt.verify(token);

    if (!decoded) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }

    const user = await this.validateUser(decoded);

    if (!user) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }

    return true;
  }
}
