import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, getRepository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { UserEntity } from '../user/user.entity';
import { CreateArticleDto } from './dto';

import { CommentRO, ArticleRO,ArticlesRO } from './article.interface';


@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleEntity: Repository<ArticleEntity>,
        @InjectRepository(CommentEntity)
        private readonly commentEntity: Repository<CommentEntity>,
        @InjectRepository(UserEntity)
        private readonly userEntity: Repository<UserEntity>
    ){}

    async findAll(): Promise<ArticlesRO> {
        
        const dbQuery = await getRepository(ArticleEntity) // 获取Repository对特定实体执行的操作
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.author', 'author');
        
        dbQuery.orderBy('article.created', 'DESC');

        const articlesCount = await dbQuery.getCount();
        const articles = await dbQuery.getMany();
        
        return { articlesCount, articles}
    }
}
