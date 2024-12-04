import { Body, Controller,Get, Post, Req, Res } from '@nestjs/common';
import { userCredentialDto } from '../dtos/credentials.dto';
import { AuthService } from '../services/auth.service';
import {Request,Response} from 'express';
import * as bcrypt from 'bcrypt';
@Controller('auth')
export class AuthController {
    constructor(private authserv:AuthService){}
    @Post('login')
    loginUser(@Body()userCredential:userCredentialDto, @Res()res:Response){
        this.authserv.validateUser(userCredential)
        .then(async (userData:any)=>{
            if(!userData) return res.status(400).json({message:'User Not registered.'});
            const matchPassword = await bcrypt.compare(userCredential.password,userData.password);
            
            if(!matchPassword){
                res.status(400).json({status:'failure',message:'email or password is incorrect.'});
            }else{
                // res.send('Login Successfully.');
                const token = this.authserv.loginUser(userData);
                res.cookie('sid',token);
                res.status(200).json({username:userData.name,email:userData.email,authToken:token,exp_in:'1h'});
            }
            
        })
        
    }

    @Post('login/session')
    loginUserWithSession(@Body()userCredential:userCredentialDto,@Req()req:Request,@Res()res:Response){
        
        this.authserv.validateUser(userCredential)
        .then(async (userData:any)=>{
            if(!userData) return res.status(400).json({message:'User Not registered.'});
            const matchPassword = await bcrypt.compare(userCredential.password,userData.password);
            
            if(!matchPassword){
                res.status(400).json({status:'failure',message:'email or password is incorrect.'});
            }else{
                console.log(userData);
                delete userData.password;
                req.session.user = userData;
                res.status(200).json({username:userData.name,email:userData.email,message:'Session set successfully.'});
            }
            
        })
    }

    @Get('check-session')
    checkSessionData(@Req()req:Request,@Res()res:Response){
        if(req.session.user){
            res.status(200).json(req.session.user);
        }else{
            res.send('session expired!')
        }
    }
}
