import { Body, Controller, Post, Res } from '@nestjs/common';
import { userCredentialDto } from '../dtos/credentials.dto';
import { AuthService } from '../Services/auth.service';
import { UserServiceService } from 'src/user/services/user-service/user-service.service';
import {Request,Response} from 'express';
import * as bcrypt from 'bcrypt';
@Controller('auth')
export class AuthController {
    constructor(private authserv:AuthService){}
    @Post('login')
    loginUser(@Body()userCredential:userCredentialDto, @Res()res:Response){
        this.authserv.validateUser(userCredential)
        .then((userData)=>{
            if(!userData) return res.status(400).json({message:'User Not registered.'});
            console.log();
            
            const matchPassword = bcrypt.compare('password','hashedpassword')
        })
        
    }
}
