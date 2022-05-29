import { Trim } from 'class-sanitizer';
import { IsString } from 'class-validator';
import { Role } from 'src/modules/auth/roles/role.enum';

export class UpdateUserNameDTO {
  @Trim()
  @IsString()
  readonly name: string;
}

export class UpdateUserRoleDTO {
  @Trim()
  @IsString()
  readonly name: string;

  @Trim()
  @IsString()
  readonly role: Role;
}
