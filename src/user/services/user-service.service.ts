import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeORM/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserServiceService {

    constructor(
        @InjectRepository(User) private userReository:Repository<User>,
    ){}


    getuserDataFromDB(){
    const allUser = this.userReository.find()
    return allUser;
    }

    createUser(data){
        const newUser = this.userReository.create(data);
        return this.userReository.save(newUser);
        
    }
    
    deleteUserData(id){
        const resp = this.userReository.delete(id);
        return resp;
        
    }

    updateuserData(id,data){
        const resp = this.userReository.update(id,data);
        return resp;
    }

    async findUser(data){
        const resp = await this.userReository.findBy(data);
        return resp[0];
        
    }
}
