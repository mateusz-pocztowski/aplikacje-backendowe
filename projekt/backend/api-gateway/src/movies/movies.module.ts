import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MOVIE_PACKAGE_NAME, MOVIE_SERVICE_NAME } from './movie.pb';
import { MoviesController } from './movies.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MOVIE_SERVICE_NAME,
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: config.get<string>('MOVIE_SVC_URL'),
            package: MOVIE_PACKAGE_NAME,
            protoPath: join(config.get<string>('MOVIE_SVC_PROTO_PATH')),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [MoviesController],
})
export class MoviesModule {}
