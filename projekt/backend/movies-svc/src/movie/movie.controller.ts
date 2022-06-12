import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateMovieRequestDto,
  EditMovieRequestDto,
  DeleteMovieRequestDto,
  FindOneRequestDto,
  GetAllMoviesRequestDto,
  RateMovieRequestDto,
} from './movie.dto';
import {
  CreateMovieResponse,
  EditMovieResponse,
  DeleteMovieResponse,
  FindOneResponse,
  GetAllMoviesResponse,
  RateMovieResponse,
  MOVIE_SERVICE_NAME,
} from './movie.pb';
import { MovieService } from './movie.service';

@Controller()
export class MovieController {
  @Inject(MovieService)
  private readonly service: MovieService;

  @GrpcMethod(MOVIE_SERVICE_NAME, 'CreateMovie')
  private createMovie(
    payload: CreateMovieRequestDto,
  ): Promise<CreateMovieResponse> {
    console.log(payload);
    return this.service.createMovie(payload);
  }

  @GrpcMethod(MOVIE_SERVICE_NAME, 'EditMovie')
  private editMovie(payload: EditMovieRequestDto): Promise<EditMovieResponse> {
    return this.service.editMovie(payload);
  }

  @GrpcMethod(MOVIE_SERVICE_NAME, 'DeleteMovie')
  private deleteMovie(
    payload: DeleteMovieRequestDto,
  ): Promise<DeleteMovieResponse> {
    return this.service.deleteMovie(payload);
  }

  @GrpcMethod(MOVIE_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindOneRequestDto): Promise<FindOneResponse> {
    return this.service.findOne(payload);
  }

  @GrpcMethod(MOVIE_SERVICE_NAME, 'GetAllMovies')
  private getAllMovies(
    payload: GetAllMoviesRequestDto,
  ): Promise<GetAllMoviesResponse> {
    return this.service.getAllMovies(payload);
  }

  @GrpcMethod(MOVIE_SERVICE_NAME, 'RankMovie')
  private rateMovie(payload: RateMovieRequestDto): Promise<RateMovieResponse> {
    return this.service.rateMovie(payload);
  }
}
