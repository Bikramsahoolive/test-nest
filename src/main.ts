import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser'
import { LoggerService } from './logger/services/logger.service';
import { AllExceptionFilter } from './logger/filters/exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerService = app.get(LoggerService);

  app.useGlobalFilters(new AllExceptionFilter(loggerService));
  app.use(cookieParser());
  // app .use(logger('dev'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
