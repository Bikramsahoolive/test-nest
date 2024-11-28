import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CreateUserController } from './user/controllers/create-user.controller';
import { UserServiceService } from './user/services/user-service/user-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeORM/entities/user';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
    type:'mssql',
    host:'localhost',
    port:1433,
    username:'sa',
    password:'Passw0rd@2024',
    database:'userdb',
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
  providers: [AppService,UserServiceService],
})
export class AppModule {}
