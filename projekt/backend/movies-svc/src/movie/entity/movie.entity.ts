import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieRateLog } from './movie-rate-log.entity';

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public name!: string;

  @Column({ type: 'varchar' })
  public genre!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  public rate!: number;

  @Column({ type: 'integer' })
  public rateCount!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  public userRate: number;

  @OneToMany(() => MovieRateLog, (movieRateLog) => movieRateLog.movie)
  public movieRateLogs: MovieRateLog[];
}
