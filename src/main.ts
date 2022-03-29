import { NestFactory } from '@nestjs/core';
import * as useragent from 'express-useragent';
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

  app.enableCors({
    origin: '*'
  });
  app.use(useragent.express());
  await app.listen(3000);
}
bootstrap();
