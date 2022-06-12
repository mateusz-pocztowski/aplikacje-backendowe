import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../auth.pb';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
