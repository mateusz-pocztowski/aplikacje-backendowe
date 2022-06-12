import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entity/movie.entity';
import {
  CreateMovieRequestDto,
  EditMovieRequestDto,
  DeleteMovieRequestDto,
  RateMovieRequestDto,
  FindOneRequestDto,
  GetAllMoviesRequestDto,
} from './movie.dto';
import {
  CreateMovieResponse,
  EditMovieResponse,
  DeleteMovieResponse,
  RateMovieResponse,
  FindOneResponse,
  GetAllMoviesResponse,
} from './movie.pb';
import { MovieRateLog } from './entity/movie-rate-log.entity';

@Injectable()
export class MovieService {
  @InjectRepository(Movie)
  private readonly repository: Repository<Movie>;

  @InjectRepository(MovieRateLog)
  private readonly movieRateLog: Repository<MovieRateLog>;

  public async getAllMovies({}: GetAllMoviesRequestDto): Promise<GetAllMoviesResponse> {
    const [movies, count] = await this.repository.findAndCount();

    return { data: { movies, count }, error: null, status: HttpStatus.OK };
  }

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
    movie.rate = 0;

    await this.repository.save(movie);

    return { data: movie, error: null, status: HttpStatus.OK };
  }

  public async editMovie(
    payload: EditMovieRequestDto,
  ): Promise<EditMovieResponse> {
    let movie: Movie = await this.repository.findOne({
      where: { id: payload.id },
    });

    if (!movie) {
      return {
        data: null,
        error: ['Movie not found'],
        status: HttpStatus.NOT_FOUND,
      };
    }

    movie.name = payload.name;
    movie.genre = payload.genre;

    movie = await this.repository.save(movie);

    return { data: movie, error: null, status: HttpStatus.OK };
  }

  public async deleteMovie(
    payload: DeleteMovieRequestDto,
  ): Promise<DeleteMovieResponse> {
    const { affected } = await this.repository.delete({ id: payload.id });

    if (affected === 0) {
      return {
        error: ['Movie not found'],
        status: HttpStatus.NOT_FOUND,
      };
    }

    return { error: null, status: HttpStatus.OK };
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

    console.log(movie.movieRateLogs);

    // TODO: calculate average rate
    await this.repository.update(movie.id, { rate: rate });
    await this.movieRateLog.insert({ movie, userId });

    return { error: null, status: HttpStatus.OK };
  }
}
