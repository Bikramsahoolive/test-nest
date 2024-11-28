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
@Module({
  imports: [UserModule,AuthModule,
    TypeOrmModule.forRoot({
    type:'mssql',
    host:'localhost',
    port: +process.env.port || 1433,
    username:process.env.username || 'sa',
    password:process.env.password || 'Passw0rd@2024',
    database:process.env.database ||'userdb',
    options:{
      encrypt:false,
      trustServerCertificate:true
    },
    entities:[User],
    synchronize:true
  }),
  TypeOrmModule.forFeature([User]),
  AuthModule
],
  controllers: [AppController, CreateUserController],
  providers: [AppService,UserServiceService,AuthService,JwtService],
})
export class AppModule {}
