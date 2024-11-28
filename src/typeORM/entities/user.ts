import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'UserData'})
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    age:number;

    @Column()
    password:string;
}