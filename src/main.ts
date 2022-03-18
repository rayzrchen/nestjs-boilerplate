import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix('thresholds/api');

  const options = new DocumentBuilder()
    .setTitle('Web App')
    .setDescription('API description')
    .setVersion('1.0')
    .setBasePath('thresholds/api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/thresholds/docs', app, document);

  await app.listen(3000);
}

bootstrap();
