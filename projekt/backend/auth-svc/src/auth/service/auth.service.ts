import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from './jwt.service';
import {
  GetUserRequestDto,
  RegisterRequestDto,
  LoginRequestDto,
  ValidateRequestDto,
  UpdateRoleRequestDto,
} from '../auth.dto';
import { Auth } from '../auth.entity';
import {
  LoginResponse,
  RegisterResponse,
  ValidateResponse,
  UpdateRoleResponse,
  GetUserResponse,
} from '../auth.pb';

@Injectable()
export class AuthService {
  @InjectRepository(Auth)
  private readonly repository: Repository<Auth>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async getUser({
    userId,
  }: GetUserRequestDto): Promise<GetUserResponse> {
    const auth: Auth = await this.repository.findOne({ where: { id: userId } });

    return { status: HttpStatus.CREATED, error: null, data: auth };
  }

  public async register({
    email,
    password,
  }: RegisterRequestDto): Promise<RegisterResponse> {
    let auth: Auth = await this.repository.findOne({ where: { email } });

    if (auth) {
      return { status: HttpStatus.CONFLICT, error: ['User already exists'] };
    }

    auth = new Auth();

    auth.email = email;
    auth.password = this.jwtService.encodePassword(password);

    await this.repository.save(auth);

    return { status: HttpStatus.CREATED, error: null };
  }

  public async login({
    email,
    password,
  }: LoginRequestDto): Promise<LoginResponse> {
    const auth: Auth = await this.repository.findOne({ where: { email } });

    if (!auth) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['User not found'],
        token: null,
      };
    }

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(
      password,
      auth.password,
    );

    if (!isPasswordValid) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Password is wrong'],
        token: null,
      };
    }

    const token: string = this.jwtService.generateToken(auth);

    return { token, status: HttpStatus.OK, error: null };
  }

  public async validate({
    token,
  }: ValidateRequestDto): Promise<ValidateResponse> {
    const decoded: Auth = await this.jwtService.verify(token);

    if (!decoded) {
      return {
        status: HttpStatus.FORBIDDEN,
        error: ['Token is invalid'],
        userId: null,
        role: null,
      };
    }

    const auth: Auth = await this.jwtService.validateUser(decoded);

    if (!auth) {
      return {
        status: HttpStatus.CONFLICT,
        error: ['User not found'],
        userId: null,
        role: null,
      };
    }

    return {
      status: HttpStatus.OK,
      error: null,
      userId: auth.id,
      role: auth.role,
    };
  }

  public async updateRole({
    role,
    email,
  }: UpdateRoleRequestDto): Promise<UpdateRoleResponse> {
    const user: Auth = await this.repository.findOne({ where: { email } });

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['User not found'],
      };
    }

    user.role = role;

    await this.repository.save(user);

    return { status: HttpStatus.OK, error: null };
  }
}
