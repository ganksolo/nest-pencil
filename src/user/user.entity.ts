import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    JoinTable,
    OneToOne,
    OneToMany,
    BeforeInsert,
    ManyToMany
} from 'typeorm';
import * as argon2 from 'argon2';
import { IsEmail } from 'class-validator';
import { ArticleEntity } from '../article/article.entity';

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

    @Column({default: ''})
    birthplace: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }

    @ManyToMany(type => ArticleEntity)
    @JoinTable()
    favorites: ArticleEntity[]

    @OneToMany(type => ArticleEntity, article => article.author)
    articles: ArticleEntity[]


}