import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    JoinTable,
    OneToOne,
    OneToMany
} from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column({default: ''})
    bio: string;

    @Column({default: ''})
    image: string;

    @Column()
    password: string;
}