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

  @ManyToOne(() => Movie, (movie) => movie.movieRateLogs)
  public movie: Movie;
}
