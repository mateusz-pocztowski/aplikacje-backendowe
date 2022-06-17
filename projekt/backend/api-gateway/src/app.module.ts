import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppInterceptor } from './app.interceptor';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${NODE_ENV}`, isGlobal: true }),
    AuthModule,
    MoviesModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: AppInterceptor }],
})
export class AppModule {}
