import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    JoinTable,
    OneToOne,
    OneToMany,
    BeforeInsert
} from 'typeorm';
import * as argon2 from 'argon2';
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

    @Column()
    birthplace: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }
}