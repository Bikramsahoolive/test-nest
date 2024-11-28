import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeORM/entities/user';

@Module({imports:[PassportModule,JwtModule.register({
    secret:process.env.jwt_secrt || 'jwt_secret',
    signOptions:{expiresIn:'1h'},
}),
TypeOrmModule.forFeature([User])],
controllers:[AuthController],
providers: [AuthService]
})
export class AuthModule {}
