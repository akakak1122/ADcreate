import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestExceptionFilter,
  HttpExceptionFilter,
  MongoExceptionFilter,
} from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new BadRequestExceptionFilter(),
    new HttpExceptionFilter(),
    new MongoExceptionFilter(),
  );

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
