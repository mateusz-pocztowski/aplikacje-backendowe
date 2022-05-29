import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/modules/auth/roles/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
