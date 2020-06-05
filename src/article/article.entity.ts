import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    JoinTable,
    OneToOne,
    OneToMany,
    BeforeInsert
} from 'typeorm';

@Entity('article')
export class ArticleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @Column()
    title: string;

}