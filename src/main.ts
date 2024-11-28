import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app .use(logger('dev'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
