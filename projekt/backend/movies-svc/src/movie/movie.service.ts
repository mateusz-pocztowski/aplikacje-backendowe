import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entity/movie.entity';
import {
  CreateMovieRequestDto,
  RateMovieRequestDto,
  FindOneRequestDto,
} from './movie.dto';
import {
  CreateMovieResponse,
  RateMovieResponse,
  FindOneResponse,
} from './movie.pb';
import { MovieRateLog } from './entity/movie-rate-log.entity';

@Injectable()
export class MovieService {
  @InjectRepository(Movie)
  private readonly repository: Repository<Movie>;

  @InjectRepository(MovieRateLog)
  private readonly movieRateLog: Repository<MovieRateLog>;

  public async findOne({ id }: FindOneRequestDto): Promise<FindOneResponse> {
    const movie: Movie = await this.repository.findOne({ where: { id } });

    if (!movie) {
      return {
        data: null,
        error: ['Movie not found'],
        status: HttpStatus.NOT_FOUND,
      };
    }

    return { data: movie, error: null, status: HttpStatus.OK };
  }

  public async createMovie(
    payload: CreateMovieRequestDto,
  ): Promise<CreateMovieResponse> {
    const movie: Movie = new Movie();

    movie.name = payload.name;
    movie.genre = payload.genre;
    movie.rate = payload.rate;

    await this.repository.save(movie);

    return { id: movie.id, error: null, status: HttpStatus.OK };
  }

  public async rateMovie({
    id,
    userId,
    rate,
  }: RateMovieRequestDto): Promise<RateMovieResponse> {
    if (rate <= 0 || rate > 10) {
      return { error: ['Rate is invalid'], status: HttpStatus.CONFLICT };
    }

    const movie: Movie = await this.repository.findOne({
      select: ['id', 'rate'],
      where: { id },
    });

    if (!movie) {
      return { error: ['Movie not found'], status: HttpStatus.NOT_FOUND };
    }

    const isAlreadyRated: number = await this.movieRateLog.count({
      where: { userId },
    });

    if (isAlreadyRated) {
      return {
        error: ['Movie has been already rated'],
        status: HttpStatus.CONFLICT,
      };
    }

    // TODO: calculate average rate
    await this.repository.update(movie.id, { rate: rate });
    await this.movieRateLog.insert({ movie, userId });

    return { error: null, status: HttpStatus.OK };
  }
}
