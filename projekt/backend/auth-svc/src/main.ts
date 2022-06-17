import { join } from 'path';
import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './auth/filter/http-exception.filter';
import { protobufPackage } from './auth/auth.pb';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: process.env.AUTH_SVC_URL,
        package: protobufPackage,
        protoPath: join(process.env.AUTH_SVC_PROTO_PATH),
      },
    },
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
}

bootstrap();
