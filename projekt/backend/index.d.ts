import { User } from './services/user/src/user/user.entity';

declare module 'express' {
  export interface Request {
    user: User;
  }
}
