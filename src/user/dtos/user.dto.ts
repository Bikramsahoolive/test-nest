import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class createUserDto{
    @ApiProperty({
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
    @IsNotEmpty()
    password:string;
}