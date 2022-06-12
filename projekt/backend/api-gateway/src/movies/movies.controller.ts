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
  Req,
} from '@nestjs/common';
import { Request } from 'express';
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
  RateMovieRequest,
  RateMovieResponse,
  MovieServiceClient,
  MOVIE_SERVICE_NAME,
} from './movie.pb';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { UserRole } from '../auth/auth.pb';

@Controller('api/movies')
export class MoviesController implements OnModuleInit {
  private svc: MovieServiceClient;

  @Inject(MOVIE_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<MovieServiceClient>(MOVIE_SERVICE_NAME);
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

  @Post()
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  @UseGuards(AuthGuard)
  private async createMovie(
    @Body() body: CreateMovieRequest,
  ): Promise<Observable<CreateMovieResponse>> {
    return this.svc.createMovie(body);
  }

  @Put(':id')
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  @UseGuards(AuthGuard)
  private async editMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EditMovieRequest,
  ): Promise<Observable<EditMovieResponse>> {
    return this.svc.editMovie({ id, ...body });
  }

  @Delete(':id')
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  @UseGuards(AuthGuard)
  private async deleteMovie(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<DeleteMovieResponse>> {
    return this.svc.deleteMovie({ id });
  }

  @Post('rate/:id')
  @Roles(UserRole.OWNER, UserRole.ADMIN, UserRole.USER)
  @UseGuards(AuthGuard)
  private async rateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: RateMovieRequest,
    @Req() req: Request,
  ): Promise<Observable<RateMovieResponse>> {
    return this.svc.rateMovie({ id, userId: req.user, ...body });
  }
}
