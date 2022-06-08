import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const port = 3001;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: { port },
    },
  );

  await app.listen();
  Logger.log(`Microservice listening on port: ${port}`, `AUTH SERVICE`);
}

bootstrap();
