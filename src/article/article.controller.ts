import { Controller, Get, Post } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService ) {}
    
    @Get()
    findAll() {
        return 'this is article controller'
    }
}
