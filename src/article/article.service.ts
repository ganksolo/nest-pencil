import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, getRepository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { UserEntity } from '../user/user.entity';
import { CreateArticleDto } from './dto';

import { CommentRO, ArticleRO, ArticlesRO } from './article.interface';
const slug = require('slug');

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
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

    async create(userId: number, articleData: CreateArticleDto): Promise<ArticleEntity> {
        
        let article = new ArticleEntity();
        article.title = articleData.title;
        article.slug = this.slugify(articleData.title);
        article.tagList = articleData.tagList || [];
        article.description = articleData.description;
        article.body = articleData.body;
        article.comments = [];
        
        const newArticle = await this.articleRepository.save(article);
        const author = await this.userRepository.findOne({ where: { id: userId }, relations: ['articles'] }); // relations指向关系

        console.log(author)
        author.articles.push(article);

        await this.userRepository.save(author);

        return newArticle;
    }

    slugify(title: string) {
        return slug(title, { lower: true }) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
    }
}
