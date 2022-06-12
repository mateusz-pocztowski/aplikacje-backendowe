import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/user.entity';
import { RegisterDTO, LoginDTO, AuthDTO } from './auth.dto';
import { AuthHelper } from './auth.helper';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  async register(body: RegisterDTO): Promise<User & AuthDTO> {
    let user = await this.repository.findOne({
      where: [{ name: body.name }, { email: body.email }],
    });

    if (user) {
      throw new RpcException({
        status: HttpStatus.CONFLICT,
        message: 'User already exists',
      });
    }

    user = new User({
      name: body.name,
      email: body.email,
      password: this.helper.encodePassword(body.password),
    });

    const savedUser: User = await this.repository.save(user);
    const authDTO: AuthDTO = {
      jwt_token: this.helper.generateToken(user),
    };

    return Object.assign(savedUser, authDTO);
  }

  async login(body: LoginDTO): Promise<AuthDTO> {
    const user = await this.repository.findOne({
      where: { email: body.email },
    });

    if (!user) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'No user found',
      });
    }

    const isPasswordValid = this.helper.isPasswordValid(
      body.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'Password is invalid',
      });
    }

    return { jwt_token: this.helper.generateToken(user) };
  }

  async refresh(user: User): Promise<string> {
    if (!user) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid user',
      });
    }

    return this.helper.generateToken(user);
  }

  async validate(token: string): Promise<boolean> {
    return this.helper.validate(token);
  }
}
