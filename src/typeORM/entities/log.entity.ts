import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Log{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    level:string;

    @Column()
    message:string;

    @Column()
    context:string;

    @CreateDateColumn()
    timestamp:Date;
}