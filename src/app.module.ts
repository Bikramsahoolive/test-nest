import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CreateUserController } from './user/controllers/user.controller';
import { UserServiceService } from './user/services//user-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeORM/entities/user';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from './logger/services/logger.service';
import { LoggerMiddleware } from './logger/middleware/logger.middleware';
@Module({
  imports: [UserModule,AuthModule,
    TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'password',
    database:'userDB',
    entities:[User],
    synchronize:true
  }),
  TypeOrmModule.forFeature([User]),
  AuthModule
],
  controllers: [AppController, CreateUserController],
  providers: [AppService,UserServiceService,AuthService,JwtService, LoggerService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
