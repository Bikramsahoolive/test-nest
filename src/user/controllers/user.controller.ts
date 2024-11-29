import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Req, Res, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { createUserDto } from '../dtos/user.dto';
import { AuthGuard } from '../guard/auth.guard';
import { ValidateuserPipe } from '../pipes/validateuser/validateuser.pipe';
import { UserServiceService } from '../services/user-service.service';
import { Response } from 'express';
import { EncryptPasswordPipe } from '../pipes/encrypt-password/encrypt-password.pipe';
import { UserDataInterceptor } from '../interceptors/all-user/all-user.interceptor';
import { SingleUserInterceptor } from '../interceptors/single-user/single-user.interceptor';
@Controller('user')
export class CreateUserController {

    
    constructor(private userServ:UserServiceService){}


    @Get('all')
    // @UseGuards(AuthGuard)
    @UseInterceptors(UserDataInterceptor)
    fetchAllUserData(){
        return this.userServ.getuserDataFromDB();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(SingleUserInterceptor)
    fetchSingleUser(@Param('id',ParseIntPipe)id:number){
        console.log(typeof id);
        
        return{id:id,name:'jhon',email:'jhon@test.com',age:'21'};
    }

    @Post('create')
    @UsePipes(new ValidationPipe())
    createUser(@Res()res:Response, @Body(ValidateuserPipe,EncryptPasswordPipe)userData:createUserDto){

        this.userServ.createUser(userData)
        .then((resp:any)=>{
            res.status(201).json({status:'success',message:'user Created.'})
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).send(err);
            
        })
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Res()res:Response,@Param('id')id:number){
        this.userServ.deleteUserData(id).then(resp=>{
            if(resp.affected==1){
                res.status(200).json({status:'success',message:'user data deleted.'})

            }else{
                res.status(400).json({
                    status:'failure',
                    message:'user not exist!'
                })
            }
        
        })
        .catch(err=>{
            console.log(err);
            throw new HttpException('Error while delete data',HttpStatus.FORBIDDEN);
            
        })
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id')id:number,@Req()req:Request,@Res()res:Response){
        const userData = req.body;
        this.userServ.updateuserData(id,userData)
        .then((resp)=>{
            
            if(resp.affected==1){
                res.status(200).json({status:'success',message:'user data updated.'});
            }else{
               res.status(400).send('User data not found to update!');
            }
        })
    }


}
