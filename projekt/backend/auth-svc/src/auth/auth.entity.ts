import { Exclude } from 'class-transformer';
import { UserRole } from '../auth/auth.pb';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  public role!: UserRole;
}
