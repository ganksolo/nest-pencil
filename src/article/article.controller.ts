import { Controller, Get, Post, Body } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto';

@Controller()
export class ArticleController {
    constructor(private articleService: ArticleService ) {}
    
    @Get('article')
    findAll() {
        return 'this is article controller'
    }

    @Post('articles')
    create(@Body() articleData: CreateArticleDto) {
        console.log(articleData);
        
        const userId = 2;

        return this.articleService.create(userId, articleData);

    }
}
