import { Controller, Get, Post, Delete, Put, Body, UseGuards, Request, Query, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('articles')
export class ArticleController {
    constructor(private articleService: ArticleService ) {}
    
    @Get()
    async findAll(@Query() query) {
        return await this.articleService.findAll(query);
    }

    @Get(':slug')
    async findOne(@Param('slug') slug) {
        return await this.articleService.findOne({slug});
    }

    @UseGuards(JwtAuthGuard)
    @Put(':slug')
    async update(@Param('slug') slug, @Body() data: CreateArticleDto) {
        return await this.articleService.update(slug, data);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':slug')
    async delete(@Param('slug') slug) {
        return await this.articleService.delete(slug);
    }


    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Request() req, @Body() articleData: CreateArticleDto) {
        return await this.articleService.create(req.user?.id, articleData);
    }
}
