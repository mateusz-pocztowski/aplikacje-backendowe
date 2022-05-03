import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/user.entity';
import { RegisterDto, LoginDto, AuthDto } from 'src/modules/auth/auth.dto';
import { AuthHelper } from 'src/modules/auth/auth.helper';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User & AuthDto> {
    let user = await this.repository.findOne({ where: { email: body.email } });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    user = new User({
      name: body.name,
      email: body.email,
      password: this.helper.encodePassword(body.password),
    });

    const savedUser: User = await this.repository.save(user);
    const authDTO: AuthDto = {
      jwt_token: this.helper.generateToken(user),
    };

    return Object.assign(savedUser, authDTO);
  }

  public async login(body: LoginDto): Promise<AuthDto> {
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

  public async refresh(user: User): Promise<string> {
    return this.helper.generateToken(user);
  }
}
