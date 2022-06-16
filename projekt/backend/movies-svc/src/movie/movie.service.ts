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

  private async attachUserRate(movie: Movie, userId: number): Promise<Movie> {
    if (!userId) {
      return movie;
    }

    const rateLog = await this.movieRateLog.findOne({
      where: { movie: { id: movie.id }, userId },
    });

    return Object.assign(movie, { userRate: rateLog?.rate });
  }

  public async getAllMovies({
    userId,
  }: GetAllMoviesRequestDto): Promise<GetAllMoviesResponse> {
    const [movies, count] = await this.repository.findAndCount();

    const moviesWithUserRate = await Promise.all(
      movies.map((movie) => this.attachUserRate(movie, userId)),
    );

    return {
      data: { movies: moviesWithUserRate, count },
      error: null,
      status: HttpStatus.OK,
    };
  }

  public async findOne({
    id,
    userId,
  }: FindOneRequestDto): Promise<FindOneResponse> {
    const movie: Movie = await this.repository.findOne({ where: { id } });

    if (!movie) {
      return {
        data: null,
        error: ['Movie not found'],
        status: HttpStatus.NOT_FOUND,
      };
    }

    const movieWithUserRate = await this.attachUserRate(movie, userId);

    return { data: movieWithUserRate, error: null, status: HttpStatus.OK };
  }

  public async createMovie(
    payload: CreateMovieRequestDto,
  ): Promise<CreateMovieResponse> {
    const movie: Movie = new Movie();

    movie.name = payload.name;
    movie.genre = payload.genre;
    movie.rate = 0;
    movie.rateCount = 0;

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
      return {
        error: ['Rate is invalid'],
        status: HttpStatus.CONFLICT,
        data: null,
      };
    }

    const movie = await this.repository.findOne({
      where: { id },
    });

    if (!movie) {
      return {
        error: ['Movie not found'],
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    const userMovieRateLog = await this.movieRateLog.findOne({
      where: { movie: { id }, userId },
    });

    // User has already rated the movie
    if (userMovieRateLog) {
      await this.movieRateLog.update(userMovieRateLog.id, { rate });
    } else {
      await this.movieRateLog.insert({ userId, movie, rate });
    }

    const [movieRateLog, count] = await this.movieRateLog.findAndCount({
      where: { movie: { id } },
    });

    const avgRate = Number(
      (
        movieRateLog.reduce((p, c) => p + Number(c.rate), 0) /
        movieRateLog.length
      ).toFixed(2),
    );

    movie.rate = avgRate;
    movie.rateCount = count;

    await this.repository.update(movie.id, movie);

    return { error: null, status: HttpStatus.OK, data: movie };
  }
}
