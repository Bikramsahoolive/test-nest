import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeORM/entities/user';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private UserRepository:Repository<User>,
        
        private readonly jwt:JwtService,
    ){}

     async validateUser(data){
        const userData = await this.UserRepository.findBy({email:data.email});
        return userData;
        
    }

    loginUser(data){

    }
}
