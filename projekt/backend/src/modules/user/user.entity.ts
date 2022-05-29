import { Exclude } from 'class-transformer';
import { Role } from 'src/modules/auth/roles/role.enum';
import {
  BaseEntity,
  Column,
  DeepPartial,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  constructor(partial: DeepPartial<User>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'varchar' })
  email!: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;
}
