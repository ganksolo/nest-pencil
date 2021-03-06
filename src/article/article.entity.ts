import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    JoinTable,
    OneToOne,
    OneToMany,
    BeforeUpdate,
    ManyToOne
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from './comment.entity';

@Entity('article')
export class ArticleEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @Column()
    title: string;

    @Column({ default: '' })
    description: string;

    @Column({default: ''})
    body: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated = new Date;
    }

    @Column('simple-array')
    tagList: string[]

    @Column({default: 0})
    favoriteCount: number;

    @OneToMany(type => CommentEntity, comment => comment.article)
    comments: CommentEntity[]


    @ManyToOne(type => UserEntity, user => user.articles)
    author: UserEntity  // FOREIGN KEY
}