import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // setup swagger documentation
  const docsConfig = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => {
    console.log('[APP]', `Ready on port: ${port}`);
  });
}

bootstrap();
