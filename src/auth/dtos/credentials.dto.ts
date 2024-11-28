import { IsEmail, IsNotEmpty } from "class-validator";

export class userCredentialDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    password:string;
}