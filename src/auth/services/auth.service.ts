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
        return userData[0];
    }

    loginUser(data:any){
        const payload = {name:data.name,email:data.email};
        const authToken = this.jwt.sign(payload,{secret:process.env.jwt_secret||'jwt_secret'});
        return authToken;
    }

    checkAuthentication(token:string){

        try {
            const userData = this.jwt.verify(token,{secret:process.env.jwt_secret||'jwt_secret'});
            
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
