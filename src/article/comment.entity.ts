import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    ManyToOne,
    ManyToMany
} from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity('comment')
export class CommentEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Body: string;

    @ManyToOne(type => ArticleEntity, article => article.comments)
    article: ArticleEntity   // // FOREIGN KEY
}