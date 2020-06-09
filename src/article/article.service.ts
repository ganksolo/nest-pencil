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

    async findAll(query): Promise<ArticlesRO> {
        
        const dbQuery = await getRepository(ArticleEntity) // 获取Repository对特定实体执行的操作
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.author', 'author');
        
        
        // dbQuery.where('1 = 1');

        // 条件查询
        if('tag' in query) {
            dbQuery.andWhere('article.tagList LIKE :tag', {tag: `%${query.tag}%`})
        }
        
        if('author' in query) {
            const author = await this.userRepository.findOne({username: query.author});
            dbQuery.andWhere('article.author = :id', {id: author.id})
        }

        if('favorited' in query) {
            const author = await this.userRepository.findOne({ username: query.favorited});
            const ids = author.favorites.map(el => el.id);
            dbQuery.andWhere('article.authorId IN (:id)', { ids });
        }
        
        dbQuery.orderBy('article.created', 'DESC');

        if('limit' in query) {
            dbQuery.limit(query.limit);
        }

        if('offset' in query) {
            dbQuery.offset(query.offset);
        }

        const articlesCount = await dbQuery.getCount();
        const articles = await dbQuery.getMany();

        return { articlesCount, articles}
    }

    async findOne(where): Promise<ArticleRO> {
        const article = await this.articleRepository.findOne(where);
        return { article };
    }

    async update(slug: string, articleData: any): Promise<ArticleRO> {
        let oldArticle = await this.articleRepository.findOne({slug: slug});
        let newArticle = Object.assign(oldArticle, articleData);
        let article = await this.articleRepository.save(newArticle);
        return { article }
    }

    async delete(slug: string): Promise<DeleteResult> {
        return await this.articleRepository.delete({ slug: slug });
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

        author.articles.push(article);

        await this.userRepository.save(author);

        return newArticle;
    }

    slugify(title: string) {
        return slug(title, { lower: true }) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
    }
}
