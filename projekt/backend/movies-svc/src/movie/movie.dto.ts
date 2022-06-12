import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  CreateMovieRequest,
  RateMovieRequest,
  FindOneRequest,
} from './movie.pb';

export class FindOneRequestDto implements FindOneRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;
}

export class CreateMovieRequestDto implements CreateMovieRequest {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  public readonly genre: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly rate: number;
}

export class RateMovieRequestDto implements RateMovieRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly userId: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly rate: number;
}
