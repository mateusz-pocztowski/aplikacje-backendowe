import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MOVIE_PACKAGE_NAME, MOVIE_SERVICE_NAME } from './movie.pb';
import { MoviesController } from './movies.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MOVIE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: MOVIE_PACKAGE_NAME,
          protoPath: 'node_modules/proto/proto/movie.proto',
        },
      },
    ]),
  ],
  controllers: [MoviesController],
})
export class MoviesModule {}
