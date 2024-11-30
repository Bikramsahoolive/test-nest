import { Module } from '@nestjs/common';
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
import { LoggerService } from './logger/logger.service';
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
export class AppModule {}
