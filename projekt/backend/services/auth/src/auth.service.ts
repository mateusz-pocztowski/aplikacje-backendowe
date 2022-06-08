import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/user.entity';
import { RegisterDTO, LoginDTO, AuthDTO } from './auth.dto';
import { AuthHelper } from './auth.helper';

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
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
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
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = this.helper.isPasswordValid(
      body.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Password is invalid', HttpStatus.NOT_FOUND);
    }

    return { jwt_token: this.helper.generateToken(user) };
  }

  async refresh(user: User): Promise<string> {
    if (!user) {
      throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
    }

    return this.helper.generateToken(user);
  }

  async validate(token: string): Promise<boolean> {
    return this.helper.validate(token);
  }
}
