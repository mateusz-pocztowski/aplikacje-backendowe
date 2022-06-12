import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseIntPipe,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  FindOneResponse,
  MovieServiceClient,
  MOVIE_SERVICE_NAME,
  CreateMovieResponse,
  CreateMovieRequest,
} from './movie.pb';
import { AuthGuard } from '../auth/auth.guard';

@Controller('movie')
export class MoviesController implements OnModuleInit {
  private svc: MovieServiceClient;

  @Inject(MOVIE_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<MovieServiceClient>(MOVIE_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createMovie(
    @Body() body: CreateMovieRequest,
  ): Promise<Observable<CreateMovieResponse>> {
    return this.svc.createMovie(body);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  private async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<FindOneResponse>> {
    return this.svc.findOne({ id });
  }
}
