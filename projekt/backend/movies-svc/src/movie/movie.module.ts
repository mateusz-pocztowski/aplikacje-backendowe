import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie } from './entity/movie.entity';
import { MovieRateLog } from './entity/movie-rate-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieRateLog])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
