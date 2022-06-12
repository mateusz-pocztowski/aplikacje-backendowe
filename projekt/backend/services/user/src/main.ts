import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const port = 3002;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.TCP,
      options: { port },
    },
  );

  await app.listen();
  Logger.log(`Microservice listening on port: ${port}`, `USER SERVICE`);
}
bootstrap();
