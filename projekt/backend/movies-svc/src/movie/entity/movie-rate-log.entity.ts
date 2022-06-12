import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
export class MovieRateLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'integer' })
  public userId!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  public rate!: number;

  @ManyToOne(() => Movie, (movie) => movie.movieRateLogs)
  public movie: Movie;
}
