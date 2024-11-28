import { IsEmail, IsNotEmpty } from "class-validator";

export class createUserDto{
    @IsNotEmpty()
    name:string;
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    age:number;
    @IsNotEmpty()
    password:string;
}