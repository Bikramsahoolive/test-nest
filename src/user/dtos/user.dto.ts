import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class createUserDto{
    @ApiProperty({
<<<<<<< HEAD
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
=======
        description:'Name of the User',
        type:String,
        required:true,
        example:'John Doe'
    })
    @IsNotEmpty()
    name:string;
    @ApiProperty({
        description:'Email of the User',
        type:String,
        required:true,
        example:'jhon@test.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @ApiProperty({
        description:'Age of the User',
        type:Number,
        required:true,
        example:21
    })
    @IsNotEmpty()
    age:number;
    @ApiProperty({
        description:'Password of the User',
        type:String,
        required:true,
        example:'password'
    })
>>>>>>> 12603ecfd057d4562c52e0118b249c490ae42ded
    @IsNotEmpty()
    password:string;
}