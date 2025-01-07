import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'UserData'})
export class User{
    @ApiProperty({
        description: 'User id as response',
        example: '001'
    })
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty({
        description: 'User name as response',
        example: 'Bikram Sahoo'
    })
    @Column()
    name:string;

    @ApiProperty({
        description: 'User email as response',
        example: 'bikramsahoo@live.in'
    })
    @Column()
    email:string;

    @ApiProperty({
        description: 'User age as response',
        example: 27
    })
    @Column()
    age:number;

    @Column()
    password:string;
}