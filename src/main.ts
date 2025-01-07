import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as logger from 'morgan';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session';
import { LoggerService } from './logger/services/logger.service';
import { AllExceptionFilter } from './logger/filters/exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
     session({
      secret: 'your-secret-key', // Should be unique and secure, preferably using an environment variable
      resave: false,              // Don't save session if unmodified
      saveUninitialized: false,   // Don't create a session until something is stored
      cookie: {
        httpOnly: true,           // Ensures cookie is not accessible via JavaScript (security feature)
        secure: false,            // Set to `true` in production if using HTTPS
        maxAge: 3600000,          // 1 hour session duration (adjust as necessary)
      }
    })
  )
  const loggerService = app.get(LoggerService);
  app.useGlobalFilters(new AllExceptionFilter(loggerService));
  app.use(cookieParser());
  //swagger
  const config = new DocumentBuilder()
    .setTitle('Swagger example')
    .setDescription('The Test API description')
    .setVersion('1.0')
    .addTag('My App')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // app .use(logger('dev'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
