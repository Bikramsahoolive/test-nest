import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class createUserDto{
    @ApiProperty({
       description:'Name is required.',
       example:'Bikram Sahoo',
    })
    @IsNotEmpty()
    name:string;


    @ApiProperty({
        description:'Email is required.',
        example:'bikramsahoo@live.in',
     })
    @IsEmail()
    @IsNotEmpty()
    email:string;


    @ApiProperty({
        description:'Age is required.',
        example:27,
     })
    @IsNotEmpty()
    age:number;


    @ApiProperty({
        description:'Password is required.',
        example:'password',
     })
    @IsNotEmpty()
    password:string;
}