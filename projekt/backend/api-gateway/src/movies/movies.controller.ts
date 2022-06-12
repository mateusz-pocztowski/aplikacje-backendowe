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
  Delete,
  Put,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  FindOneResponse,
  GetAllMoviesResponse,
  GetAllMoviesRequest,
  CreateMovieRequest,
  CreateMovieResponse,
  EditMovieRequest,
  EditMovieResponse,
  DeleteMovieResponse,
  MovieServiceClient,
  MOVIE_SERVICE_NAME,
} from './movie.pb';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/movies')
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

  @Put(':id')
  @UseGuards(AuthGuard)
  private async editMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EditMovieRequest,
  ): Promise<Observable<EditMovieResponse>> {
    return this.svc.editMovie({ id, ...body });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  private async deleteMovie(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<DeleteMovieResponse>> {
    return this.svc.deleteMovie({ id });
  }

  @Get()
  private async getAllMovies(
    @Body() body: GetAllMoviesRequest,
  ): Promise<Observable<GetAllMoviesResponse>> {
    return this.svc.getAllMovies(body);
  }

  @Get(':id')
  private async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<FindOneResponse>> {
    return this.svc.findOne({ id });
  }
}
