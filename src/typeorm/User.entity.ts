import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{ 
    @PrimaryGeneratedColumn({
        type: "int",
        name: "user_id"
    })
    id: number;

    @Column({
        type: "varchar",
        name: "username",
        length: 255,
        nullable: false,
    })
    username: string;

    @Column({
        name: "email",
        nullable: false,
        default: ''
    })
    email: string;

    @Column({
        name: "password",
        nullable: false,
        default: ''
    })
    password: string;

}