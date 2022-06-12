import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  GetAllMoviesRequest,
  CreateMovieRequest,
  EditMovieRequest,
  DeleteMovieRequest,
  RateMovieRequest,
  FindOneRequest,
} from './movie.pb';

export class FindOneRequestDto implements FindOneRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;
}

export class GetAllMoviesRequestDto implements GetAllMoviesRequest {}

export class CreateMovieRequestDto implements CreateMovieRequest {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  public readonly genre: string;
}

export class EditMovieRequestDto implements EditMovieRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;

  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  public readonly genre: string;
}

export class DeleteMovieRequestDto implements DeleteMovieRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;
}

export class RateMovieRequestDto implements RateMovieRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly userId: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly rate: number;
}
