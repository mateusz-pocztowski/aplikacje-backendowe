import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateMovieRequestDto,
  FindOneRequestDto,
  RateMovieRequestDto,
} from './movie.dto';
import {
  CreateMovieResponse,
  FindOneResponse,
  MOVIE_SERVICE_NAME,
  RateMovieResponse,
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
    return this.service.createMovie(payload);
  }

  @GrpcMethod(MOVIE_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindOneRequestDto): Promise<FindOneResponse> {
    return this.service.findOne(payload);
  }

  @GrpcMethod(MOVIE_SERVICE_NAME, 'RankMovie')
  private rateMovie(payload: RateMovieRequestDto): Promise<RateMovieResponse> {
    return this.service.rateMovie(payload);
  }
}
