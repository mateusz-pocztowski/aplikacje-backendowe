import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthHelper } from './auth.helper';
import { User } from './user/user.entity';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'token',
      ignoreExpiration: true,
    });
  }

  async validate(payload: string): Promise<User> {
    return this.helper.validateUser(payload);
  }
}
